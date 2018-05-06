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


WhileStatement.prototype.check = function(context) {
	var cond = this.condition.check(context);
	if(cond!=BooleanType.instance) {
		throw new SyntaxError("Expected a Boolean condition!");
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
    writer.append(" :\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

WhileStatement.prototype.toODialect = function(writer) {
    writer.append("while (");
    this.condition.toDialect(writer);
    writer.append(") {\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("}\n");
};


WhileStatement.prototype.canReturn = function() {
    return true;
};

exports.WhileStatement = WhileStatement;
