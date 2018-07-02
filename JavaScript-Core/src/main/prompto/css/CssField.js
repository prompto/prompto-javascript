function CssField(name, value) {
	this.name = name;
	this.value = value;
	return this;
}

CssField.prototype.toDialect = function(writer) {
	writer.append(this.name).append(":");
    this.value.toDialect(writer);
	writer.append(";");
};

CssField.prototype.declare = function(transpiler) {
    this.value.declare(transpiler);
};

CssField.prototype.transpile = function(transpiler) {
	transpiler.append("'").append(this.name).append("':");
    this.value.transpile(transpiler);
};


exports.CssField = CssField;
