var Expression = require("./Expression").Expression;
var CodeValue = require("../value/CodeValue").CodeValue;
var PromptoError = require("../error/PromptoError").PromptoError;

function ExecuteExpression(id) {
	Expression.call(this);
	this.id = id;
	return this;
}


ExecuteExpression.prototype  = Object.create(Expression.prototype);
ExecuteExpression.prototype.constructor = ExecuteExpression;

Object.defineProperty(ExecuteExpression.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

ExecuteExpression.prototype.toString = function() {
	return "execute: " + this.name;
};

ExecuteExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

ExecuteExpression.prototype.toEDialect = function(writer) {
    writer.append("execute: ");
    writer.append(this.name);
};

ExecuteExpression.prototype.toODialect = function(writer) {
    writer.append("execute(");
    writer.append(this.name);
    writer.append(")");
};

ExecuteExpression.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
};

ExecuteExpression.prototype.check = function(context) {
	try {
		var value = context.getValue(this.id);
		if(value instanceof CodeValue) {
			return value.checkCode(context);
		} else {
			throw new SyntaxError("Expected code, got:" + value.toString());
		}
	} catch(e) {
		if(e instanceof PromptoError) {
			throw new SyntaxError(e.message);
		}
	}
};

ExecuteExpression.prototype.interpret = function(context) {
	var value = context.getValue(this.id);
	if(value instanceof CodeValue) {
		return value.interpret(context);
	} else {
		throw new SyntaxError("Expected code, got:" + value.toString());
	}
};


ExecuteExpression.prototype.declare = function(transpiler) {
	var value = transpiler.context.getValue(this.id);
	value.declareCode(transpiler);
};


ExecuteExpression.prototype.transpile = function(transpiler) {
    transpiler.append("(");
    var value = transpiler.context.getValue(this.id);
    value.transpileCode(transpiler);
    transpiler.append(")");
};


exports.ExecuteExpression = ExecuteExpression;
