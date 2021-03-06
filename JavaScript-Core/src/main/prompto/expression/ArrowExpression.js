import PredicateExpression from './PredicateExpression.js'
import { Dialect } from '../parser/index.js'
import { ReturnStatement, StatementList } from '../statement/index.js'
import { Variable, Context } from '../runtime/index.js'
import { IntegerValue, BooleanValue } from '../value/index.js'
import { SyntaxError } from '../error/index.js'
import { CodeWriter } from '../utils/index.js'

export default class ArrowExpression extends PredicateExpression {
  
    constructor(args, argsSuite, arrowSuite) {
        super();
        this.args = args;
        this.argsSuite = argsSuite;
        this.arrowSuite = arrowSuite;
        this.statements = null;
    }

    toArrowExpression() {
        return this;
    }

    toString(writer) {
        if(!writer) {
            writer = new CodeWriter(Dialect.E, Context.newGlobalsContext());
        }
        try {
            this.toDialect(writer);
            return writer.toString();
        } catch(e) {
            return "";
        }
    }

    check(context, returnType) {
        return this.statements.check(context, returnType || null);
    }

    interpret(context) {
        return this.statements.interpret(context);
    }

    checkFilter(context, itemType) {
        if (!this.args || this.args.length !== 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        context = context.newChildContext();
        context.registerValue(new Variable(this.args[0], itemType));
        return this.statements.check(context, null);
    }

    declare(transpiler) {
        this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        this.statements.transpile(transpiler);
        return false;
    }

    toDialect(writer) {
        this.argsToDialect(writer);
        if(this.argsSuite!=null)
            writer.append(this.argsSuite);
        writer.append("=>");
        if(this.arrowSuite!=null)
            writer.append(this.arrowSuite);
        this.bodyToDialect(writer);
    }

    filteredToDialect(writer, source) {
        if(this.args==null || this.args.length !== 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        const sourceType = source.check(writer.context);
        const itemType = sourceType.itemType;
        writer = writer.newChildWriter();
        writer.context.registerValue(new Variable(this.args[0], itemType));
        switch(writer.dialect) {
            case Dialect.E:
            case Dialect.M:
                source.toDialect(writer);
                writer.append(" filtered where ");
                this.toDialect(writer);
                break;
            case Dialect.O:
                writer.append("filtered (");
                source.toDialect(writer);
                writer.append(") where (");
                this.toDialect(writer);
                writer.append(")");
                break;
        }
    }


    containsToDialect(writer) {
        writer.append("where ");
        if (writer.dialect === Dialect.O)
            writer.append("( ");
        this.toDialect(writer);
        if (writer.dialect === Dialect.O)
            writer.append(" ) ");
    }


    bodyToDialect(writer) {
        if(this.statements.length === 1 && this.statements[0] instanceof ReturnStatement)
            this.statements[0].expression.toDialect(writer);
        else {
            writer.append("{").newLine().indent();
            this.statements.toDialect(writer);
            writer.newLine().dedent().append("}").newLine();
        }
    }

    argsToDialect(writer) {
        if(this.args==null || this.args.length === 0)
            writer.append("()");
        else if(this.args.length === 1)
            writer.append(this.args[0].name);
        else {
            writer.append("(");
            writer.append(this.args.join(", "));
            writer.append(")");
        }
    }

    setExpression(expression) {
        const stmt = new ReturnStatement(expression, true);
        this.statements = new StatementList(stmt);
    }

    registerArrowArgs(context, itemType) {
        this.args.forEach(arg => {
            const param = new Variable(arg, itemType);
            context.registerValue(param);
        });
        return context;
    }

    getFilter(context, itemType) {
        const local = this.registerArrowArgs(context.newLocalContext(), itemType);
        const filter = function(o) {
            local.setValue(this.args[0], o);
            const result = this.statements.interpret(local);
            if(result instanceof BooleanValue)
                return result.value;
            else
                throw new SyntaxError("Expecting a Boolean result!");
        };
        return filter.bind(this);
    }

    declareFilter(transpiler, itemType) {
        if(this.args.length !== 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        transpiler = transpiler.newChildTranspiler(null);
        transpiler.context.registerValue(new Variable(this.args[0], itemType));
        this.statements.declare(transpiler);
    }

    transpileFilter(transpiler, itemType) {
        if(this.args.length !== 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        transpiler = transpiler.newChildTranspiler(null);
        transpiler.context.registerValue(new Variable(this.args[0], itemType));
        transpiler.append("function(").append(this.args[0]).append(") { ");
        this.statements.transpile(transpiler);
        transpiler.append(" }");
        transpiler.flush();
    }

    getSortedComparator(context, itemType, descending) {
        switch(this.args.length) {
            case 1:
                return this.getSortedComparator1Arg(context, itemType, descending);
            case 2:
                return this.getSortedComparator2Args(context, itemType, descending);
            default:
                throw new Error("sorted arrow methods only support 1 or 2 arguments")
        }
    }

    getSortedComparator1Arg(context, itemType, descending) {
        const local = this.registerArrowArgs(context.newLocalContext(), itemType);
        const cmp = function(o1, o2) {
            local.setValue(this.args[0], o1);
            const key1 = this.statements.interpret(local);
            local.setValue(this.args[0], o2);
            const key2 = this.statements.interpret(local);
            return descending ? key2.compareToValue(context, key1) : key1.compareToValue(context, key2);
        };
        return cmp.bind(this);
    }

    getSortedComparator2Args(context, itemType, descending) {
        const local = this.registerArrowArgs(context.newLocalContext(), itemType);
        const cmp = function(o1, o2) {
            local.setValue(this.args[0], o1);
            local.setValue(this.args[1], o2);
            const result = this.statements.interpret(local);
            if(!(result instanceof IntegerValue))
                throw new SyntaxError("Expecting an Integer as result of key body!");
            return descending ? -result.value : result.value;
        };
        return cmp.bind(this);
    }

    transpileSortedComparator(transpiler, itemType, descending) {
        switch(this.args.length) {
            case 1:
                this.transpileSortedComparator1Arg(transpiler, itemType, descending);
                break;
            case 2:
                this.transpileSortedComparator2Args(transpiler, itemType, descending);
                break;
            default:
                throw new SyntaxError("Expecting 1 or 2 parameters only!");
        }
    }

    transpileSortedComparator1Arg(transpiler, itemType, descending) {
        transpiler = transpiler.newLocalTranspiler();
        this.registerArrowArgs(transpiler.context, itemType);
        transpiler.append("function(o1, o2) { ");
        transpiler.append("var $key = function(");
        transpiler.append(this.args[0]);
        transpiler.append(") { ");
        this.statements.transpile(transpiler);
        transpiler.append(" }; ");
        transpiler.append("o1 = $key(o1); ");
        transpiler.append("o2 = $key(o2); ");
        if(descending)
            transpiler.append("return o1 === o2 ? 0 : o1 > o2 ? -1 : 1;");
        else
            transpiler.append("return o1 === o2 ? 0 : o1 > o2 ? 1 : -1;");
        transpiler.append(" }");
        transpiler.flush();
    }

    transpileSortedComparator2Args(transpiler, itemType, descending) {
        transpiler = transpiler.newLocalTranspiler();
        this.registerArrowArgs(transpiler.context, itemType);
        if(descending) {
            transpiler.append("function(");
            transpiler.append(this.args.join(", "));
            transpiler.append(") { return -(");
        }
        transpiler.append("function(");
        transpiler.append(this.args.join(", "));
        transpiler.append(") {");
        this.statements.transpile(transpiler);
        transpiler.append("}");
        if(descending) {
            transpiler.append(")(");
            transpiler.append(this.args.join(", "));
            transpiler.append("); }");
        }
        transpiler.flush();
    }
}
