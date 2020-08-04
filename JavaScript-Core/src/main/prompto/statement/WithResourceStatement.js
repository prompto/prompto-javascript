var BaseStatement = require("./BaseStatement").BaseStatement;

class WithResourceStatement extends BaseStatement {
    constructor(resource, statements) {
        super();
        this.resource = resource;
        this.statements = statements;
    }

    check(context) {
        context = context.newResourceContext();
        this.resource.checkResource(context);
        return this.statements.check(context);
    }

    interpret(context) {
        context = context.newResourceContext();
        try {
            this.resource.interpret(context);
            return this.statements.interpret(context);
        } finally {
            var res = context.getValue(this.resource.id);
            if(res.close) {
                res.close();
            }
        }
    }

    declare(transpiler) {
        transpiler = transpiler.newResourceTranspiler();
        this.resource.declare(transpiler);
        this.statements.declare(transpiler);
    }

    transpile(transpiler) {
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

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("with ");
        this.resource.toDialect(writer);
        writer.append(", do:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer) {
        writer.append("with (");
        this.resource.toDialect(writer);
        writer.append(")");
        var oneLine = this.statements.length==1 && this.statements[0].isSimple();
        if(!oneLine)
            writer.append(" {");
        writer.newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if(!oneLine) {
            writer.append("}").newLine();
        }
    }

    toMDialect(writer) {
        writer.append("with ");
        this.resource.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }
}

exports.WithResourceStatement = WithResourceStatement;