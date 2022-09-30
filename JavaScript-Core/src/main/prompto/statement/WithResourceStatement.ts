import BaseStatement from './BaseStatement'
import {AssignVariableStatement, StatementList} from "./index";
import {Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IType, VoidType} from "../type";
import {IResource, IValue} from "../value";
import {CodeWriter} from "../utils";

export default class WithResourceStatement extends BaseStatement {

    resource: AssignVariableStatement;
    statements: StatementList | null;

    constructor(resource: AssignVariableStatement, statements: StatementList | null) {
        super();
        this.resource = resource;
        this.statements = statements;
    }

    locateSectionAtLine(line: number): Section | null {
        if(line == this.startLocation.line)
            return this;
        else if(this.statements)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    check(context: Context): IType {
        context = context.newResourceContext();
        this.resource.checkResource(context);
        return this.statements ? this.statements.check(context, null) : VoidType.instance;
    }

    interpret(context: Context): IValue | null {
        context = context.newResourceContext();
        try {
            this.resource.interpret(context);
            return this.statements ? this.statements.interpret(context) : null;
        } finally {
            const res = context.getValue(this.resource.id) as unknown as IResource;
            res.close();
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler = transpiler.newResourceTranspiler();
        this.resource.declare(transpiler);
        this.statements && this.statements.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler = transpiler.newResourceTranspiler();
        this.resource.transpile(transpiler);
        transpiler.append(";").newLine();
        transpiler.append("try {").indent();
        this.statements && this.statements.transpile(transpiler);
        transpiler.dedent().append("} finally {").indent();
        this.resource.transpileClose(transpiler);
        transpiler.dedent().append("}");
        transpiler.flush();
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("with ");
        this.resource.toDialect(writer);
        writer.append(", do:").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("with (");
        this.resource.toDialect(writer);
        writer.append(")");
        const oneLine = this.statements && this.statements.length==1 && this.statements[0].isSimple();
        if(!oneLine)
            writer.append(" {");
        writer.newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
        if(!oneLine) {
            writer.append("}").newLine();
        }
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("with ");
        this.resource.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }
}
