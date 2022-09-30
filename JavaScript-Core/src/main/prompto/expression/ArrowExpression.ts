import PredicateExpression from './PredicateExpression'
import { Dialect } from '../parser'
import { ReturnStatement, StatementList } from '../statement'
import {Variable, Context, Transpiler} from '../runtime'
import {IntegerValue, BooleanValue, IValue, NullValue} from '../value'
import { SyntaxError } from '../error'
import { CodeWriter } from '../utils'
import {IdentifierList} from "../grammar";
import {IterableType, IType} from "../type";
import {IExpression} from "./index";

export default class ArrowExpression extends PredicateExpression {

    args: IdentifierList;
    argsSuite: string | null;
    arrowSuite: string | null;
    statements?: StatementList;

    constructor(args: IdentifierList, argsSuite: string | null, arrowSuite: string | null) {
        super();
        this.args = args;
        this.argsSuite = argsSuite;
        this.arrowSuite = arrowSuite;
    }

    toArrowExpression(): ArrowExpression {
        return this;
    }

    toString(writer?: CodeWriter): string {
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

    check(context: Context, returnType: IType | null): IType {
        return this.statements!.check(context, returnType || null);
    }

    interpret(context: Context): IValue {
        const value = this.statements!.interpret(context);
        return value || NullValue.instance;
    }

    checkFilter(context: Context, itemType: IType): IType {
        if (!this.args || this.args.length != 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        context = context.newChildContext();
        context.registerInstance(new Variable(this.args[0], itemType), true);
        return this.statements!.check(context, null);
    }

    declare(transpiler: Transpiler): void {
        this.statements!.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.statements!.transpile(transpiler);
    }

    toDialect(writer: CodeWriter): void {
        this.argstoDialect(writer);
        if(this.argsSuite!=null)
            writer.append(this.argsSuite);
        writer.append("=>");
        if(this.arrowSuite!=null)
            writer.append(this.arrowSuite);
        this.bodyToDialect(writer);
    }

    filteredToDialect(writer: CodeWriter, source: IExpression): void {
        if(this.args==null || this.args.length != 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        const sourceType = source.check(writer.context);
        const itemType = (sourceType as unknown as IterableType).itemType;
        writer = writer.newChildWriter();
        writer.context.registerInstance(new Variable(this.args[0], itemType), true);
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


    containsToDialect(writer: CodeWriter): void {
        writer.append("where ");
        if (writer.dialect == Dialect.O)
            writer.append("( ");
        this.toDialect(writer);
        if (writer.dialect == Dialect.O)
            writer.append(" ) ");
    }


    bodyToDialect(writer: CodeWriter): void {
        if(this.statements) {
            const statements = this.statements!;
            if (statements.length == 1 && statements[0] instanceof ReturnStatement)
                (statements[0] as ReturnStatement).expression.toDialect(writer);
            else {
                writer.append("{").newLine().indent();
                statements.toDialect(writer);
                writer.newLine().dedent().append("}").newLine();
            }
        }
    }

    argstoDialect(writer: CodeWriter): void {
        if(this.args==null || this.args.length == 0)
            writer.append("()");
        else if(this.args.length == 1)
            writer.append(this.args[0].name);
        else {
            writer.append("(");
            writer.append(this.args.join(", "));
            writer.append(")");
        }
    }

    setExpression(expression: IExpression): void {
        const stmt = new ReturnStatement(expression, true);
        this.statements = new StatementList(undefined, stmt);
    }

    registerArrowArgs(context: Context, itemType: IType): Context {
        this.args.forEach(arg => context.registerInstance(new Variable(arg, itemType), true));
        return context;
    }

    getFilter(context: Context, itemType: IType): (o: IValue) => boolean {
        const local = this.registerArrowArgs(context.newLocalContext(), itemType);
        const filter = (o: IValue) => {
            local.setValue(this.args[0], o);
            const result = this.statements!.interpret(local);
            if(result instanceof BooleanValue)
                return result.value;
            else
                throw new SyntaxError("Expecting a Boolean result!");
        };
        return filter.bind(this);
    }

    declareFilter(transpiler: Transpiler, itemType: IType): void {
        if(this.args.length != 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerInstance(new Variable(this.args[0], itemType), true);
        this.statements!.declare(transpiler);
    }

    transpileFilter(transpiler: Transpiler, itemType: IType) {
        if(this.args.length != 1)
            throw new SyntaxError("Expecting 1 parameter only!");
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerInstance(new Variable(this.args[0], itemType), true);
        transpiler.append("function(").append(this.args[0].name).append(") { ");
        this.statements!.transpile(transpiler);
        transpiler.append(" }");
        transpiler.flush();
    }

    getSortedComparator(context: Context, itemType: IType, descending: boolean): (o1: IValue, o2: IValue) => number {
        switch(this.args.length) {
            case 1:
                return this.getSortedComparator1Arg(context, itemType, descending);
            case 2:
                return this.getSortedComparator2Args(context, itemType, descending);
            default:
                throw new Error("sorted arrow methods only support 1 or 2 arguments")
        }
    }

    getSortedComparator1Arg(context: Context, itemType: IType, descending: boolean): (o1: IValue, o2: IValue) => number  {
        const local = this.registerArrowArgs(context.newLocalContext(), itemType);
        const cmp = (o1: IValue, o2: IValue) => {
            local.setValue(this.args[0], o1);
            const key1 = this.statements!.interpret(local);
            local.setValue(this.args[0], o2);
            const key2 = this.statements!.interpret(local);
            return descending ? key2!.CompareTo(context, key1!) : key1!.CompareTo(context, key2!);
        };
        return cmp.bind(this) as (o1: IValue, o2: IValue) => number;
    }

    getSortedComparator2Args(context: Context, itemType: IType, descending: boolean): (o1: IValue, o2: IValue) => number {
        const local = this.registerArrowArgs(context.newLocalContext(), itemType);
        const cmp = (o1: IValue, o2: IValue) => {
            local.setValue(this.args[0], o1);
            local.setValue(this.args[1], o2);
            const result = this.statements!.interpret(local);
            if(!(result instanceof IntegerValue))
                throw new SyntaxError("Expecting an Integer as result of key body!");
            return descending ? -result.value : result.value;
        };
        return cmp.bind(this) as (o1: IValue, o2: IValue) => number;
    }

    transpileSortedComparator(transpiler: Transpiler, itemType: IType, descending: boolean) {
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

    transpileSortedComparator1Arg(transpiler: Transpiler, itemType: IType, descending: boolean) {
        transpiler = transpiler.newLocalTranspiler();
        this.registerArrowArgs(transpiler.context, itemType);
        transpiler.append("function(o1, o2) { ");
        transpiler.append("var $key = function(");
        transpiler.append(this.args[0].name);
        transpiler.append(") { ");
        this.statements!.transpile(transpiler);
        transpiler.append(" }; ");
        transpiler.append("o1 = $key(o1); ");
        transpiler.append("o2 = $key(o2); ");
        if(descending)
            transpiler.append("return o1 == o2 ? 0 : o1 > o2 ? -1 : 1;");
        else
            transpiler.append("return o1 == o2 ? 0 : o1 > o2 ? 1 : -1;");
        transpiler.append(" }");
        transpiler.flush();
    }

    transpileSortedComparator2Args(transpiler: Transpiler, itemType: IType, descending: boolean) {
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
        this.statements!.transpile(transpiler);
        transpiler.append("}");
        if(descending) {
            transpiler.append(")(");
            transpiler.append(this.args.join(", "));
            transpiler.append("); }");
        }
        transpiler.flush();
    }
}
