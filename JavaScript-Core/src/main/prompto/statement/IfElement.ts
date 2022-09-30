import BaseStatement from "./BaseStatement";
import {StatementList} from "./index";
import {Section} from "../parser";
import {BooleanType, IType} from "../type";
import {EqualsExpression, IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class IfElement extends BaseStatement {

    condition: IExpression | null;
    statements: StatementList;

    constructor(condition: IExpression | null, statements: StatementList) {
        super();
        this.condition = condition;
        this.statements = statements;
        if(condition)
            this.copySectionFrom(Section.merge(condition.asSection(), statements.asSection()!));
        else
            this.copySectionFrom(statements.asSection()!);
    }

    locateSectionAtLine(line: number) {
        if(this.condition instanceof Section) {
            const section = this.condition.locateSectionAtLine(line);
            if(section != null)
                return section;
        }
        if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    check(context: Context): IType {
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

    declare(transpiler: Transpiler): void {
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

    transpile(transpiler: Transpiler): void {
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

    downcast(context: Context, setValue: boolean) {
        const parent = context;
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downcast(context, setValue);
        context = parent!=context ? context : context.newChildContext();
        return context;
    }

    interpret(context: Context): IValue | null {
        context = this.downcast(context, true);
        return this.statements.interpret(context);
    }

    toMDialect(writer: CodeWriter): boolean {
        return this.toEDialect(writer);
    }

    toEDialect(writer: CodeWriter): boolean {
        let context = writer.context;
        if(this.condition!=null) {
            writer.append("if ");
            this.condition.toDialect(writer);
            context = this.downcast(context, false);
            if (context != writer.context)
                writer = writer.newChildWriter(context);
        }
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        return false
    }

    toODialect(writer: CodeWriter): boolean {
        let context = writer.context;
        if(this.condition!=null)
        {
            writer.append("if (");
            this.condition.toDialect(writer);
            writer.append(") ");
            context = this.downcast(context, false);
            if (context != writer.context)
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
        if(!this.statements || this.statements.length == 0)
            return false;
        if(this.statements.length > 1)
            return true;
        else
            return !this.statements[0].isSimple();
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }
}

