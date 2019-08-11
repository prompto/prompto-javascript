var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var AttributeParameter = require("../param/AttributeParameter").AttributeParameter;

function SetterMethodDeclaration(id, statements) {
    ConcreteMethodDeclaration.call(this, id, null, null, statements);
	return this;
}

SetterMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
SetterMethodDeclaration.prototype.contructor = SetterMethodDeclaration;

SetterMethodDeclaration.prototype.toODialect = function(writer) {
    writer.append("setter ").append(this.name).append(" {").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent().append("}").newLine();
};

SetterMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ").append(this.name).append(" as setter doing:").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

SetterMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def ").append(this.name).append(" setter():").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

SetterMethodDeclaration.prototype.transpile = function(transpiler) {
    var arg = new AttributeParameter(this.id);
    arg.register(transpiler.context);
    this.statements.transpile(transpiler);
};

exports.SetterMethodDeclaration = SetterMethodDeclaration;
