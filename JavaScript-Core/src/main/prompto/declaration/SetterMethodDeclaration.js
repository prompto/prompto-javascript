var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var AttributeArgument = require("../argument/AttributeArgument").AttributeArgument;

function SetterMethodDeclaration(id, statements) {
    ConcreteMethodDeclaration.call(this, id, null, null, statements);
	return this;
}

SetterMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
SetterMethodDeclaration.prototype.contructor = SetterMethodDeclaration;

SetterMethodDeclaration.prototype.toODialect = function(writer) {
    writer.append("setter ");
    writer.append(this.name);
    writer.append(" {\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("}\n");
};

SetterMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as setter doing:\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

SetterMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def ");
    writer.append(this.name);
    writer.append(" setter():\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

SetterMethodDeclaration.prototype.transpile = function(transpiler) {
    var arg = new AttributeArgument(this.id);
    arg.register(transpiler.context);
    this.statements.transpile(transpiler);
};

exports.SetterMethodDeclaration = SetterMethodDeclaration;
