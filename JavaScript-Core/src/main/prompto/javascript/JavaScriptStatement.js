var VoidType = require("../type/VoidType").VoidType;
var AnyType = require("../type/AnyType").AnyType;
var JavaScriptType = require("./JavaScriptType").JavaScriptType;
var getTypeName = require("./JavaScriptUtils").getTypeName;
var Identifier = require("../grammar/Identifier").Identifier;

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

JavaScriptStatement.prototype.interpret = function(context, returnType) {
	var result = this.expression.interpret(context, this.module);
	if (!this.isReturn) {
		return null;
	}
	if(result !== null) {
        var id = new Identifier(getTypeName(result));
		var type = new JavaScriptType(id);
		result = type.convertJavaScriptValueToPromptoValue(context, result, returnType);
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

JavaScriptStatement.prototype.transpile = function(transpiler) {
    if(this.isReturn)
        transpiler.append("return ");
    if(!this.expression.transpile)
        throw new Error(this.expression.toString());
    this.expression.transpile(transpiler);
    if(this.module!=null)
        throw new Error(this.module.toString());
};

JavaScriptStatement.prototype.declare = function(transpiler) {
    // TODO module
};

exports.JavaScriptStatement = JavaScriptStatement;
