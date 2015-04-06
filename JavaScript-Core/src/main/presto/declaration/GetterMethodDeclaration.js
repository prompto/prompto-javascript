var BaseCategoryMethodDeclaration = require("./BaseCategoryMethodDeclaration").BaseCategoryMethodDeclaration;

function GetterMethodDeclaration(name, instructions) {
	BaseCategoryMethodDeclaration.call(this, name, null, instructions);
	return this;
}

GetterMethodDeclaration.prototype = Object.create(BaseCategoryMethodDeclaration.prototype);
GetterMethodDeclaration.prototype.contructor = GetterMethodDeclaration;

GetterMethodDeclaration.prototype.interpret = function(context) {
	return this.instructions.interpret(context);
};

GetterMethodDeclaration.prototype.toODialect = function(writer) {
    writer.append("getter ");
    writer.append(this.name);
    writer.append(" {\n");
    writer.indent();
    this.instructions.toDialect(writer);
    writer.dedent();
    writer.append("}\n");
}

GetterMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" getter doing:\n");
    writer.indent();
    this.instructions.toDialect(writer);
    writer.dedent();
}

GetterMethodDeclaration.prototype.toSDialect = function(writer) {
    writer.append("def ");
    writer.append(this.name);
    writer.append(" getter():\n");
    writer.indent();
    this.instructions.toDialect(writer);
    writer.dedent();
}

exports.GetterMethodDeclaration = GetterMethodDeclaration;
