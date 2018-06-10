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

MatchingExpressionConstraint.prototype.declare = function(transpiler, name, type) {
    var transpiler = transpiler.newChildTranspiler();
    var id = new Identifier("value");
    transpiler.context.registerValue(new Variable(id, type));
    this.expression.declare(transpiler);
    this.transpile = function(transpiler) { this.transpileChecker(transpiler, name, type); };
    transpiler.declare(this);
};

MatchingExpressionConstraint.prototype.transpileChecker = function(transpiler, name, type) {
    transpiler.append("function $check_").append(name).append("(value) {").indent();
    transpiler = transpiler.newChildTranspiler();
    var id = new Identifier("value");
    transpiler.context.registerValue(new Variable(id, type));
    transpiler.append("if(");
    this.expression.transpile(transpiler);
    transpiler.append(")").indent();
    transpiler.append("return value;").dedent();
    transpiler.append("else").indent();
    transpiler.append("throw new IllegalValueError((value == null ? 'null' : value.toString()) + ' does not match: \"").append(this.expression.toString()).append("\"');").dedent();
    transpiler.dedent().append("}").newLine();
    transpiler.flush();
};

exports.MatchingExpressionConstraint = MatchingExpressionConstraint;

