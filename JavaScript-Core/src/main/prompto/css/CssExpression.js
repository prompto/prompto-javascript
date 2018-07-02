var CssType = require("../type/CssType").CssType;
var CssValue = require("../value/CssValue").CssValue;

function CssExpression() {
    this.fields = [];
    return this;
}

CssExpression.prototype.check = function(context) {
	return CssType.instance;
}

CssExpression.prototype.interpret = function(context) {
	return new CssValue(this);
}

CssExpression.prototype.toDialect = function(writer) {
	writer.append("{");
	this.fields.forEach(function(field) {
	    field.toDialect(writer);
    }, this);
	writer.append("}");
}

CssExpression.prototype.addField = function(field) {
    this.fields.push(field);
}

CssExpression.prototype.declare = function(transpiler) {
    this.fields.forEach(function(field) {
        field.declare(transpiler);
    }, this);
}

CssExpression.prototype.transpile = function(transpiler) {
	transpiler.append("{");
	this.fields.forEach(function(field) {
	    field.transpile(transpiler);
		transpiler.append(", ");
	}, this);
	transpiler.trimLast(", ".length);
	transpiler.append("}");
	return false;
}

exports.CssExpression = CssExpression;
