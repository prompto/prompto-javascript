var BaseStatement = require("./BaseStatement").BaseStatement;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var BooleanType = require("../type/BooleanType").BooleanType;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var BreakResult = require("../runtime/BreakResult").BreakResult;

function WhileStatement(condition, statements) {
	BaseStatement.call(this);
	this.condition = condition;
	this.statements = statements;
	return this;
}

WhileStatement.prototype = Object.create(BaseStatement.prototype);
WhileStatement.prototype.constructor = WhileStatement;


WhileStatement.prototype.declare = function(transpiler) {
    this.condition.declare(transpiler);
    transpiler = transpiler.newChildTranspiler();
    this.statements.declare(transpiler);
};


WhileStatement.prototype.transpile = function(transpiler) {
    transpiler.append("while(");
    this.condition.transpile(transpiler);
    transpiler.append(") {");
    transpiler.indent();
    var child = transpiler.newChildTranspiler();
    this.statements.transpile(child);
    child.dedent().flush();
    transpiler.append("}").newLine();
    return true;
};


WhileStatement.prototype.check = function(context) {
	var cond = this.condition.check(context);
	if(cond!=BooleanType.instance) {
        context.problemListener.reportError(this, "Expected a Boolean condition!");
	}
	var child = context.newChildContext();
	return this.statements.check(child, null);
};

WhileStatement.prototype.interpret = function(context) {
	while(this.interpretCondition(context)) {
		var child = context.newChildContext();
		var value = this.statements.interpret(child);
        if(value==BreakResult.instance)
            break;
		if(value!=null)
			return value;
	}
	return null;
}

WhileStatement.prototype.interpretCondition = function(context) {
	var value = this.condition.interpret(context);
	if(!(value instanceof BooleanValue)) {
		throw new InvalidDataError("Expected a Boolean, got:" + typeof(value));
	}
	return value.value;
};

WhileStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

WhileStatement.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
};

WhileStatement.prototype.toEDialect = function(writer) {
    writer.append("while ");
    this.condition.toDialect(writer);
    writer.append(" :").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

WhileStatement.prototype.toODialect = function(writer) {
    writer.append("while (");
    this.condition.toDialect(writer);
    writer.append(") {").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent().append("}").newLine();
};


WhileStatement.prototype.canReturn = function() {
    return true;
};

WhileStatement.prototype.locateSectionAtLine = function(line) {
    return this.statements.locateSectionAtLine(line) || this;
};

exports.WhileStatement = WhileStatement;
