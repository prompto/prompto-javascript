var ResourceContext = require("../runtime/Context").ResourceContext;
var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var ResourceType = require("../type/ResourceType").ResourceType;
var VoidType = require("../type/VoidType").VoidType;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;

function WriteStatement(content, resource) {
	SimpleStatement.call(this);
	this.content = content;
	this.resource = resource;
	return this;
}

WriteStatement.prototype = Object.create(SimpleStatement.prototype);
WriteStatement.prototype.constructor = WriteStatement;

WriteStatement.prototype.toString = function() {
	return "write " + this.content.toString() + " to " + this.resource.toString();
};

WriteStatement.prototype.check = function(context) {
	context = context instanceof ResourceContext ? context : context.newResourceContext();
	var resourceType = this.resource.check(context);
	if(!(resourceType instanceof ResourceType))
        context.problemListener.reportNotAResource(this.resource);
	return VoidType.instance;
};

WriteStatement.prototype.interpret = function(context) {
    var resContext = context instanceof ResourceContext ? context : context.newResourceContext();
	var res = this.resource.interpret(resContext);
	if(res==null) {
		throw new NullReferenceError();
	}
	if(!res.isWritable || !res.isWritable()) {
		throw new InvalidResourceError("Not writable");
	}
	var str = this.content.interpret(resContext).toString();
	try {
        if(context==resContext) {
            res.writeLine(str);
        } else {
            res.writeFully(str);
        }
        return null;
    } finally {
        if(resContext!=context)
            res.close();
    }
};

WriteStatement.prototype.declare = function(transpiler) {
    if(!(transpiler.context instanceof ResourceContext))
        transpiler = transpiler.newResourceTranspiler();
    this.resource.declare(transpiler);
    this.content.declare(transpiler);
};

WriteStatement.prototype.transpile = function(transpiler) {
    if (transpiler.context instanceof ResourceContext)
        this.transpileLine(transpiler);
    else
        this.transpileFully(transpiler);
};

WriteStatement.prototype.transpileLine = function(transpiler) {
    this.resource.transpile(transpiler);
    transpiler.append(".writeLine(");
    this.content.transpile(transpiler);
    transpiler.append(")");
};


WriteStatement.prototype.transpileFully = function(transpiler) {
    transpiler = transpiler.newResourceTranspiler();
    transpiler.append("var $res = ");
    this.resource.transpile(transpiler);
    transpiler.append(";").newLine();
    transpiler.append("try {").indent();
    transpiler.append("$res.writeFully(");
    this.content.transpile(transpiler);
    transpiler.append(");");
    transpiler.dedent().append("} finally {").indent();
    transpiler.append("$res.close();").newLine();
    transpiler.dedent().append("}");
    transpiler.flush();
};

WriteStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

WriteStatement.prototype.toEDialect = function(writer) {
    writer.append("write ");
    this.content.toDialect(writer);
    writer.append(" to ");
    this.resource.toDialect(writer);
};

WriteStatement.prototype.toODialect = function(writer) {
    writer.append("write (");
    this.content.toDialect(writer);
    writer.append(") to ");
    this.resource.toDialect(writer);
};

WriteStatement.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
};

exports.WriteStatement = WriteStatement;
