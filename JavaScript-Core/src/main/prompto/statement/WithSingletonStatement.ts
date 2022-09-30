import BaseStatement from './BaseStatement'
import {StatementList} from "../statement";
import {CategoryType, IType, VoidType} from "../type";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class WithSingletonStatement extends BaseStatement {

    type: CategoryType;
    statements: StatementList | null;

    constructor(type: CategoryType, statements: StatementList | null) {
        super();
        this.type = type;
        this.statements = statements;
    }

    locateSectionAtLine(line: number) {
        if(this.statements)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    check(context: Context): IType {
        const instanceContext = context.newInstanceContext(null, this.type, true);
        const childContext = instanceContext.newChildContext();
        return this.statements ? this.statements.check(childContext, null) : VoidType.instance;
    }

    interpret(context: Context): IValue | null {
        // TODO synchronize
        const instance = context.loadSingleton(this.type);
        const instanceContext = context.newInstanceContext(instance, null, true);
        const childContext = instanceContext.newChildContext();
        return this.statements ? this.statements.interpret(childContext) : null;
    }

    declare(transpiler: Transpiler): void {
        this.type.declare(transpiler);
        transpiler = transpiler.newInstanceTranspiler(this.type);
        transpiler = transpiler.newChildTranspiler();
        this.statements && this.statements.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const instance = transpiler.newInstanceTranspiler(this.type);
        const child = instance.newChildTranspiler();
        this.statements && this.statements.transpile(child);
        child.flush();
        instance.flush();
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("with ");
        this.type.toDialect(writer);
        writer.append(", do:").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("with (");
        this.type.toDialect(writer);
        writer.append(")");
        const oneLine = this.statements && this.statements.length==1 && this.statements[0].isSimple();
        if(!oneLine)
            writer.append(" {");
        writer.newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
        if(!oneLine)
            writer.append("}").newLine();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("with ");
        this.type.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }
}

