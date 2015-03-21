var BaseCategoryMethodDeclaration = require("./BaseCategoryMethodDeclaration").BaseCategoryMethodDeclaration;

function SetterMethodDeclaration(name, instructions) {
	BaseCategoryMethodDeclaration.call(this, name, null, instructions);
	return this;
}

SetterMethodDeclaration.prototype = Object.create(BaseCategoryMethodDeclaration.prototype);
SetterMethodDeclaration.prototype.contructor = SetterMethodDeclaration;

SetterMethodDeclaration.prototype.interpret = function(context) {
	return this.instructions.interpret(context);
};

SetterMethodDeclaration.prototype.toODialect = function(writer) {
    writer.append("setter ");
    writer.append(this.name);
    writer.append(" {\n");
    writer.indent();
    this.instructions.toDialect(writer);
    writer.dedent();
    writer.append("}\n");
}

SetterMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" setter doing:\n");
    writer.indent();
    this.instructions.toDialect(writer);
    writer.dedent();
}

SetterMethodDeclaration.prototype.toPDialect = function(writer) {
    writer.append("def ");
    writer.append(this.name);
    writer.append(" setter():\n");
    writer.indent();
    this.instructions.toDialect(writer);
    writer.dedent();
}

exports.SetterMethodDeclaration = SetterMethodDeclaration;
