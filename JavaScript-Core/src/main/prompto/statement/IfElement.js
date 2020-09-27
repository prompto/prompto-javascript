import BaseStatement from "./BaseStatement";
import {BooleanType} from "../type";
import {StatementList} from "./index";
import {EqualsExpression} from "../expression";

export default class IfElement extends BaseStatement {

    constructor(condition, statements) {
        super();
        this.condition = condition;
        this.statements = statements;
    }

    check(context) {
        if(this.condition) {
            const type = this.condition.check(context);
            if(type!=BooleanType.instance) {
                context.problemListener.reportError(this, "Expected a Boolean condition!");
            }
        }
        context = this.downCast(context, false);
        let statements = this.statements;
        if(!statements) {
            context.problemListener.reportError(this, "Expected a statement!");
            statements = new StatementList();
        }
        return statements.check(context, null);
    }

    declare(transpiler) {
        if(this.condition)
            this.condition.declare(transpiler);
        let context = transpiler.context;
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downCast(transpiler.context, false);
        if(context!=transpiler.context)
            transpiler = transpiler.newChildTranspiler(context);
        else
            transpiler = transpiler.newChildTranspiler();
        this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        let context = transpiler.context;
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downCast(context, false);
        if(context!=transpiler.context)
            transpiler = transpiler.newChildTranspiler(context);
        else
            transpiler = transpiler.newChildTranspiler();
        this.statements.transpile(transpiler);
        transpiler.flush();
    }

    downCast(context, setValue) {
        const parent = context;
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downCast(context, setValue);
        context = parent!=context ? context : context.newChildContext();
        return context;
    }

    interpret(context) {
        context = this.downCast(context, true);
        return this.statements.interpret(context);
    }

    toMDialect(writer) {
        this.toEDialect(writer);
    }

    toEDialect(writer) {
        let context = writer.context;
        if(this.condition!=null) {
            writer.append("if ");
            this.condition.toDialect(writer);
            context = this.downCast(context, false);
            if (context !== writer.context)
                writer = writer.newChildWriter(context);
        }
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer) {
        let context = writer.context;
        if(this.condition!=null)
        {
            writer.append("if (");
            this.condition.toDialect(writer);
            writer.append(") ");
            context = this.downCast(context, false);
            if (context !== writer.context)
                writer = writer.newChildWriter(context);
        }
        const curly = this.statements!=null && this.statements.length>1;
        if(curly)
            writer.append("{").newLine();
        else
            writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if(curly)
            writer.append("}");
    }
}

