import BaseStatement from "./BaseStatement.js";
import {StatementList} from "./index.js";
import {Section} from "../parser/index.js";
import {BooleanType} from "../type/index.js";
import {EqualsExpression} from "../expression/index.js";

export default class IfElement extends BaseStatement {

    constructor(condition, statements) {
        super();
        this.condition = condition;
        this.statements = statements;
        if(condition==null)
            this.copySectionFrom(statements.asSection());
        else
            this.copySectionFrom(Section.merge(condition, statements.asSection()));
    }

    locateSectionAtLine(line) {
        if(this.condition instanceof Section) {
            const section = this.condition.locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    check(context) {
        if(this.condition) {
            const type = this.condition.check(context);
            if(type!=BooleanType.instance) {
                context.problemListener.reportError(this, "Expected a Boolean condition!");
            }
        }
        context = this.downcast(context, false);
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
            context = this.condition.downcast(transpiler.context, false);
        if(context!=transpiler.context)
            transpiler = transpiler.newChildTranspiler(context);
        else
            transpiler = transpiler.newChildTranspiler();
        this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        let context = transpiler.context;
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downcast(context, false);
        if(context!=transpiler.context)
            transpiler = transpiler.newChildTranspiler(context);
        else
            transpiler = transpiler.newChildTranspiler();
        this.statements.transpile(transpiler);
        transpiler.flush();
    }

    downcast(context, setValue) {
        const parent = context;
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downcast(context, setValue);
        context = parent!=context ? context : context.newChildContext();
        return context;
    }

    interpret(context) {
        context = this.downcast(context, true);
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
            context = this.downcast(context, false);
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
            context = this.downcast(context, false);
            if (context !== writer.context)
                writer = writer.newChildWriter(context);
        }
        const curly = this.needsCurlyBraces();
        if(curly)
            writer.append("{").newLine();
        else
            writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if(curly)
            writer.append("}");
        return curly;
    }

    needsCurlyBraces() {
        if(!this.statements || this.statements.length === 0)
            return false;
        if(this.statements.length > 1)
            return true;
        else
            return !this.statements[0].isSimple();
    }
}

