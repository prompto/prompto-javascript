function CssCode(expression) {
    this.expression = expression;
    return this;
}


CssCode.prototype.toDialect = function(writer) {
	writer.append("{");
	this.expression.toDialect(writer);
	writer.append("}");
};

CssCode.prototype.declare = function(transpiler) {
	this.expression.declare(transpiler);
};

CssCode.prototype.transpile = function(transpiler) {
	this.expression.transpile(transpiler);
};

exports.CssCode = CssCode;
