var BaseStatement = require("./BaseStatement").BaseStatement;

class WithSingletonStatement extends BaseStatement {
    constructor(type, statements) {
        super();
        this.type = type;
        this.statements = statements;
        return this;
    }

    check(context) {
        var instanceContext = context.newInstanceContext(null, this.type, true);
        var childContext = instanceContext.newChildContext();
        return this.statements.check(childContext, null);
    }

    interpret(context) {
        // TODO synchronize
        var instance = context.loadSingleton(this.type);
        var instanceContext = context.newInstanceContext(instance, null, true);
        var childContext = instanceContext.newChildContext();
        return this.statements.interpret(childContext);
    }

    declare(transpiler) {
        this.type.declare(transpiler);
        transpiler = transpiler.newInstanceTranspiler(this.type);
        transpiler = transpiler.newChildTranspiler();
        return this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        var instance = transpiler.newInstanceTranspiler(this.type);
        var child = instance.newChildTranspiler();
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
        var oneLine = this.statements.length==1 && this.statements[0].isSimple();
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

exports.WithSingletonStatement = WithSingletonStatement;
