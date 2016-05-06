var ResourceType = require("../type/ResourceType").ResourceType;
var ResourceContext = require("../runtime/Context").ResourceContext;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var InternalError = require("../error/InternalError").InternalError;
var InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
var TextType = require("../type/TextType").TextType;
var Text = require("../value/Text").Text;

function ReadExpression(resource) {
	this.resource = resource;
	return this;
}

ReadExpression.prototype.toString = function() {
	return "read from " + this.resource.toString();
};

ReadExpression.prototype.toDialect = function(writer) {
    writer.append("read from ");
    this.resource.toDialect(writer);
};

ReadExpression.prototype.check = function(context) {
    context = context instanceof ResourceContext ? context : context.newResourceContext();
    var sourceType = this.resource.check(context);
	if(!(sourceType instanceof ResourceType))
        context.problemListener.reportNotAResource(this.resource);
	return TextType.instance;
};

ReadExpression.prototype.interpret = function(context) {
    var resContext = context instanceof ResourceContext ? context : context.newResourceContext();
    var res = this.resource.interpret(resContext);
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
        return new Text(s);
    } finally {
        if(resContext!=context)
            res.close();
    }
};

exports.ReadExpression = ReadExpression;
