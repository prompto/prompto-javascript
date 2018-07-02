var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;

function GetterMethodDeclaration(id, statements) {
    ConcreteMethodDeclaration.call(this, id, null, null, statements);
	return this;
}

GetterMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
GetterMethodDeclaration.prototype.contructor = GetterMethodDeclaration;

GetterMethodDeclaration.prototype.toODialect = function(writer) {
    writer.append("getter ");
    writer.append(this.name);
    writer.append(" {\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("}\n");
};

GetterMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as getter doing:\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

GetterMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def ");
    writer.append(this.name);
    writer.append(" getter():\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

GetterMethodDeclaration.prototype.transpile = function(transpiler) {
    this.statements.transpile(transpiler);
};

exports.GetterMethodDeclaration = GetterMethodDeclaration;
