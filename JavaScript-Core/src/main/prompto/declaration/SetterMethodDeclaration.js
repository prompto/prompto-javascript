var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var AttributeParameter = require("../param/AttributeParameter").AttributeParameter;

class SetterMethodDeclaration extends ConcreteMethodDeclaration {
    constructor(id, statements) {
        super(id, null, null, statements);
        return this;
    }

    toODialect(writer) {
        writer.append("setter ").append(this.name).append(" {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer) {
        writer.append("define ").append(this.name).append(" as setter doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toMDialect(writer) {
        writer.append("def ").append(this.name).append(" setter():").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    transpile(transpiler) {
        var arg = new AttributeParameter(this.id);
        arg.register(transpiler.context);
        this.statements.transpile(transpiler);
    }
}

SetterMethodDeclaration.prototype.contructor = SetterMethodDeclaration;

exports.SetterMethodDeclaration = SetterMethodDeclaration;
