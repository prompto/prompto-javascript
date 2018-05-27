var ResourceType = require("../type/ResourceType").ResourceType;
var ResourceContext = require("../runtime/Context").ResourceContext;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var InternalError = require("../error/InternalError").InternalError;
var InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
var TextType = require("../type/TextType").TextType;
var TextValue = require("../value/TextValue").TextValue;

function ReadAllExpression(resource) {
	this.resource = resource;
	return this;
}

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
	if(!(res.isReadable)) {
		throw new InternalError("Illegal read source: " + o);
	}
	if(!res.isReadable()) {
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
