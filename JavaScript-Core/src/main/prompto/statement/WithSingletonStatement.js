import BaseStatement from './BaseStatement.js'
import {StatementList} from "./index.js";

export default class WithSingletonStatement extends BaseStatement {

    constructor(type, statements) {
        super();
        this.type = type;
        this.statements = statements;
    }

    locateSectionAtLine(line) {
        if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    check(context) {
        const instanceContext = context.newInstanceContext(null, this.type, true);
        const childContext = instanceContext.newChildContext();
        return this.statements.check(childContext, null);
    }

    interpret(context) {
        // TODO synchronize
        const instance = context.loadSingleton(this.type);
        const instanceContext = context.newInstanceContext(instance, null, true);
        const childContext = instanceContext.newChildContext();
        return this.statements.interpret(childContext);
    }

    declare(transpiler) {
        this.type.declare(transpiler);
        transpiler = transpiler.newInstanceTranspiler(this.type);
        transpiler = transpiler.newChildTranspiler();
        return this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        const instance = transpiler.newInstanceTranspiler(this.type);
        const child = instance.newChildTranspiler();
        this.statements.transpile(child);
        child.flush();
        instance.flush();
        return true;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("with ");
        this.type.toDialect(writer);
        writer.append(", do:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer) {
        writer.append("with (");
        this.type.toDialect(writer);
        writer.append(")");
        const oneLine = this.statements.length==1 && this.statements[0].isSimple();
        if(!oneLine)
            writer.append(" {");
        writer.newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if(!oneLine)
            writer.append("}").newLine();
    }

    toMDialect(writer) {
        writer.append("with ");
        this.type.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }
}

