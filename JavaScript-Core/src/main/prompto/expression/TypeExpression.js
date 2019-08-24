var Expression = require("./Expression").Expression;
var TypeType = require("../type/TypeType").TypeType;
var TypeValue = require("../value/TypeValue").TypeValue;

function TypeExpression(value) {
	Expression.call(this);
	this.value = value;
	return this;
}

TypeExpression.prototype = Object.create(Expression.prototype);
TypeExpression.prototype.constructor = TypeExpression;

TypeExpression.prototype.toDialect = function(writer) {
    writer.append(this.value.toString());
};

TypeExpression.prototype.toString = function() {
    return this.value.toString();
};

TypeExpression.prototype.check = function(context) {
	return new TypeType(this.value);
};

TypeExpression.prototype.interpret = function(context) {
	return new TypeValue(this.value);
};


TypeExpression.prototype.declare = function(transpiler) {
    this.value.declare(transpiler);
};


TypeExpression.prototype.transpile = function(transpiler) {
    this.value.transpile(transpiler);
};


TypeExpression.prototype.getMemberValue = function(context, name) {
	return this.value.getStaticMemberValue(context, name);
};

exports.TypeExpression = TypeExpression;