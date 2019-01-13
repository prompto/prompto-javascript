var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;

function GetterMethodDeclaration(id, statements) {
    ConcreteMethodDeclaration.call(this, id, null, null, statements);
	return this;
}

GetterMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
GetterMethodDeclaration.prototype.contructor = GetterMethodDeclaration;

GetterMethodDeclaration.prototype.toODialect = function(writer) {
    writer.append("getter ").append(this.name).append(" {").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent().append("}").newLine();
};

GetterMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ").append(this.name).append(" as getter doing:").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

GetterMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def ").append(this.name).append(" getter():").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

GetterMethodDeclaration.prototype.transpile = function(transpiler) {
    this.statements.transpile(transpiler);
};

exports.GetterMethodDeclaration = GetterMethodDeclaration;
