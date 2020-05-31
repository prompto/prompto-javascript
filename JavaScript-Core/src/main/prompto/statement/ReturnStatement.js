var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var NullValue = require("../value/NullValue").NullValue;
var VoidResult = require("../runtime/VoidResult").VoidResult;
var VoidType = require("../type/VoidType").VoidType;

function ReturnStatement(expression, fromArrowExpression) {
	SimpleStatement.call(this);
	this.expression = expression || null;
    this.fromArrowExpression = fromArrowExpression || false;
	return this;
}

ReturnStatement.prototype = Object.create(SimpleStatement.prototype);
ReturnStatement.prototype.constructor = ReturnStatement;

ReturnStatement.prototype.toString = function() {
	return "return " + this.expression==null ? "" : this.expression.toString();
}

ReturnStatement.prototype.toDialect = function(writer) {
    writer.append("return");
    if(this.expression!=null) {
        writer.append(" ");
        this.expression.toDialect(writer);
    }
};


ReturnStatement.prototype.equals = function(obj) {
	if(obj==this) {
		return true;
	}
	if(obj==null) {
		return false;
	}
	if(!(obj instanceof ReturnStatement)) {
		return false;
	}
    if(this.expression==obj.expression)
        return true;
    else if(this.expression==null || obj.expression==null)
        return false;
	else
        return this.expression.equals(obj.expression);
};

ReturnStatement.prototype.declare = function(transpiler) {
	if(this.expression)
        this.expression.declare(transpiler);
};

ReturnStatement.prototype.transpile = function(transpiler) {
    transpiler.append("return");
    if(this.expression) {
        transpiler.append(" ");
        this.expression.transpile(transpiler);
    }
};

ReturnStatement.prototype.check = function(context) {
    if(this.expression==null)
        return VoidType.instance;
    var type = this.expression.check(context);
    if(type == VoidType.instance && !this.fromArrowExpression)
        context.problemListener.reportReturningVoidType(this.expression);
    return type;
};

ReturnStatement.prototype.interpret = function(context) {
    if(this.expression==null)
        return VoidResult.instance;
    else
        return this.expression.interpret(context) || NullValue.instance;
};


ReturnStatement.prototype.canReturn = function() {
    return true;
};

exports.ReturnStatement = ReturnStatement;
