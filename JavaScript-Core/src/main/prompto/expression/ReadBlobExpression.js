var Expression = require("./Expression").Expression;
var ResourceType = require("../type/ResourceType").ResourceType;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
var BlobType = require("../type/BlobType").BlobType;
var BlobValue = require("../value/BlobValue").BlobValue;

function ReadBlobExpression(resource) {
    Expression.call(this);
	this.resource = resource;
	return this;
}

ReadBlobExpression.prototype = Object.create(Expression.prototype);
ReadBlobExpression.prototype.constructor = ReadBlobExpression;

ReadBlobExpression.prototype.toString = function() {
	return "read Blob from " + this.resource.toString();
};

ReadBlobExpression.prototype.toDialect = function(writer) {
    writer.append("read Blob from ");
    this.resource.toDialect(writer);
};

ReadBlobExpression.prototype.check = function(context) {
    context = context.newResourceContext();
    var sourceType = this.resource.check(context);
	if(!(sourceType instanceof ResourceType))
        context.problemListener.reportNotAResource(this.resource);
	return BlobType.instance;
};

ReadBlobExpression.prototype.interpret = function(context) {
    context = context.newResourceContext();
    var res = this.resource.interpret(context);
	if(res==null) {
		throw new NullReferenceError();
	}
	if(!res.isReadable || !res.isReadable()) {
		throw new InvalidResourceError("Not readable");
	}
    try {
        var b = res.readBinary();
        return new BlobValue(b.mimeType, b.data);
    } finally {
        res.close();
    }
};

ReadBlobExpression.prototype.declare = function(transpiler) {
    this.resource.declare(transpiler);
};


ReadBlobExpression.prototype.transpile = function(transpiler) {
    this.resource.transpile(transpiler);
    transpiler.append(".readBinary()");
};

exports.ReadBlobExpression = ReadBlobExpression;
