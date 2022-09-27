import BaseStatement from './BaseStatement.ts'
import {StatementList} from "./index.ts";

export default class WithResourceStatement extends BaseStatement {

    constructor(resource, statements) {
        super();
        this.resource = resource;
        this.statements = statements;
    }

    locateSectionAtLine(line) {
        if(line === this.start.line)
            return this;
        else if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    check(context: Context): IType {
        context = context.newResourceContext();
        this.resource.checkResource(context);
        return this.statements.check(context, null);
    }

    interpret(context: Context): IValue {
        context = context.newResourceContext();
        try {
            this.resource.interpret(context);
            return this.statements.interpret(context);
        } finally {
            const res = context.getValue(this.resource.id);
            if(res.close) {
                res.close();
            }
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler = transpiler.newResourceTranspiler();
        this.resource.declare(transpiler);
        this.statements.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler = transpiler.newResourceTranspiler();
        this.resource.transpile(transpiler);
        transpiler.append(";").newLine();
        transpiler.append("try {").indent();
        this.statements.transpile(transpiler);
        transpiler.dedent().append("} finally {").indent();
        this.resource.transpileClose(transpiler);
        transpiler.dedent().append("}");
        transpiler.flush();
        return true;
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("with ");
        this.resource.toDialect(writer);
        writer.append(", do:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("with (");
        this.resource.toDialect(writer);
        writer.append(")");
        const oneLine = this.statements.length==1 && this.statements[0].isSimple();
        if(!oneLine)
            writer.append(" {");
        writer.newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if(!oneLine) {
            writer.append("}").newLine();
        }
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("with ");
        this.resource.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }
}
