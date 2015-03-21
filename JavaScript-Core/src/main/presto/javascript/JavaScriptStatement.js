var VoidType = require("../type/VoidType").VoidType;
var AnyType = require("../type/AnyType").AnyType;
var JavaScriptType = require("./JavaScriptType").JavaScriptType;

function JavaScriptStatement(expression, isReturn) {
	this.expression = expression;
	this.isReturn = isReturn || false;
    this.module = null;
	return this;
}

JavaScriptStatement.prototype.toString = function() {
	return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
};

JavaScriptStatement.prototype.check = function(context) {
	return this.isReturn ? AnyType.instance : VoidType.instance;
};

JavaScriptStatement.prototype.interpret = function(context) {
	var result = this.expression.interpret(context, this.module);
	if (!this.isReturn) {
		return null;
	}
	if(result !== null) {
		var type = new JavaScriptType(typeof(result));
		result = type.convertJavaScriptValueToPrestoValue(result);
	}
	return result;
};

JavaScriptStatement.prototype.toDialect = function(writer) {
    if(this.isReturn)
        writer.append("return ");
    this.expression.toDialect(writer);
    writer.append(';');
    if(this.module!=null)
        this.module.toDialect(writer);
};

exports.JavaScriptStatement = JavaScriptStatement;
