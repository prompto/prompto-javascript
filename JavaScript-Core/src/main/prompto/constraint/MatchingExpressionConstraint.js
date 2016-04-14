var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var Identifier = require("../grammar/Identifier").Identifier;
var Variable = require("../runtime/Variable").Variable;
var AnyType = require("../type/AnyType").AnyType;

function MatchingExpressionConstraint(expression) {
	this.expression = expression;
	return this;
}

MatchingExpressionConstraint.prototype.checkValue = function(context, value) {
	var child = context.newChildContext();
    var id = new Identifier("value");
	child.registerValue(new Variable(id, AnyType.instance));
	child.setValue(id, value);
	var test = this.expression.interpret(child);
	if(!test.value) {
		throw new InvalidDataError((value == null ? "null" : value.toString()) + " does not match:" + this.expression.toString());
	}
};

MatchingExpressionConstraint.prototype.toDialect = function(writer) {
    writer.append(" matching ");
    this.expression.toDialect(writer);
}

exports.MatchingExpressionConstraint = MatchingExpressionConstraint;

