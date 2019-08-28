var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var Identifier = require("../grammar/Identifier").Identifier;
var Variable = require("../runtime/Variable").Variable;

function MatchingPatternConstraint(expression) {
	this.expression = expression;
	this.pattern = null;
	return this;
}

MatchingPatternConstraint.prototype.checkValue = function(context, value) {
	if(this.pattern==null) {
		var toMatch = this.expression.interpret(context);
		this.pattern = new RegExp(toMatch);
	}
	if(!this.pattern.test(value.toString())) {
		throw new InvalidDataError(value.toString() + " does not match:" + this.pattern.toString());
	}
};

MatchingPatternConstraint.prototype.toDialect = function(writer) {
    writer.append(" matching ");
    this.expression.toDialect(writer);
}


MatchingPatternConstraint.prototype.declare = function(transpiler, name, type) {
    transpiler = transpiler.newChildTranspiler();
    var id = new Identifier("value");
    transpiler.context.registerValue(new Variable(id, type));
    this.expression.declare(transpiler);
    this.transpile = function(transpiler) { this.transpileChecker(transpiler, name, type); };
    transpiler.declare(this);
};

MatchingPatternConstraint.prototype.transpileChecker = function(transpiler, name, type) {
    transpiler.append("function $check_").append(name).append("(value) {").indent();
    transpiler = transpiler.newChildTranspiler();
    var id = new Identifier("value");
    transpiler.context.registerValue(new Variable(id, type));
    transpiler.append("if(new RegExp(");
    this.expression.transpile(transpiler);
    transpiler.append(").test(value))").indent();
    transpiler.append("return value;").dedent();
    transpiler.append("else").indent();
    transpiler.append("throw new IllegalValueError((value == null ? 'null' : value.toString()) + ' does not match: ").append(this.expression.toString()).append("');").dedent();
    transpiler.dedent().append("}").newLine();
    transpiler.flush();
};


exports.MatchingPatternConstraint = MatchingPatternConstraint;
