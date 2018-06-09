var BaseStatement = require("./BaseStatement").BaseStatement;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var BooleanType = require("../type/BooleanType").BooleanType;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var BreakResult = require("../runtime/BreakResult").BreakResult;

function DoWhileStatement(condition, statements) {
	BaseStatement.call(this);
	this.condition = condition;
	this.statements = statements;
	return this;
}

DoWhileStatement.prototype = Object.create(BaseStatement.prototype);
DoWhileStatement.prototype.constructor = DoWhileStatement;


DoWhileStatement.prototype.declare = function(transpiler) {
    this.condition.declare(transpiler);
    transpiler = transpiler.newChildTranspiler();
    this.statements.declare(transpiler);
};


DoWhileStatement.prototype.transpile = function(transpiler) {
    transpiler.append("do {").indent();
    var child = transpiler.newChildTranspiler();
    this.statements.transpile(child);
    child.dedent().flush();
    transpiler.append("} while(");
    this.condition.transpile(transpiler);
    transpiler.append(")");
};



DoWhileStatement.prototype.check = function(context) {
	var cond = this.condition.check(context);
	if(cond!=BooleanType.instance) {
		throw new SyntaxError("Expected a Boolean condition!");
	}
	var child = context.newChildContext();
	return this.statements.check(child, null);
};

DoWhileStatement.prototype.interpret = function(context) {
	do {
		var child = context.newChildContext();
		var value = this.statements.interpret(child);
        if(value==BreakResult.instance)
            break;
		if(value!=null)
			return value;
	} while(this.interpretCondition(context));
	return null;
}

DoWhileStatement.prototype.interpretCondition = function(context) {
	var value = this.condition.interpret(context);
	if(!(value instanceof BooleanValue)) {
		throw new InvalidDataError("Expected a Boolean, got:" + typeof(value));
	}
	return value.value;
};

DoWhileStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

DoWhileStatement.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
};

DoWhileStatement.prototype.toEDialect = function(writer) {
    writer.append("do:\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("while ");
    this.condition.toDialect(writer);
    writer.newLine();
};

DoWhileStatement.prototype.toODialect = function(writer) {
    writer.append("do {\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("} while (");
    this.condition.toDialect(writer);
    writer.append(");\n");
};



DoWhileStatement.prototype.canReturn = function() {
    return true;
};


exports.DoWhileStatement = DoWhileStatement;

