var Expression = require("./Expression").Expression;
var ResourceType = require("../type/ResourceType").ResourceType;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
var TextType = require("../type/TextType").TextType;
var TextValue = require("../value/TextValue").TextValue;

function ReadAllExpression(resource) {
    Expression.call(this);
	this.resource = resource;
	return this;
}

ReadAllExpression.prototype = Object.create(Expression.prototype);
ReadAllExpression.prototype.constructor = ReadAllExpression;

ReadAllExpression.prototype.toString = function() {
	return "read all from " + this.resource.toString();
};

ReadAllExpression.prototype.toDialect = function(writer) {
    writer.append("read all from ");
    this.resource.toDialect(writer);
};

ReadAllExpression.prototype.check = function(context) {
    context = context.newResourceContext();
    var sourceType = this.resource.check(context);
	if(!(sourceType instanceof ResourceType))
        context.problemListener.reportNotAResource(this.resource);
	return TextType.instance;
};

ReadAllExpression.prototype.interpret = function(context) {
    context = context.newResourceContext();
    var res = this.resource.interpret(context);
	if(res==null) {
		throw new NullReferenceError();
	}
	if(!res.isReadable || !res.isReadable()) {
		throw new InvalidResourceError("Not readable");
	}
    try {
        var s = res.readFully();
        return new TextValue(s);
    } finally {
        res.close();
    }
};

ReadAllExpression.prototype.declare = function(transpiler) {
    this.resource.declare(transpiler);
};


ReadAllExpression.prototype.transpile = function(transpiler) {
    this.resource.transpile(transpiler);
    transpiler.append(".readFully()");
};

exports.ReadAllExpression = ReadAllExpression;
