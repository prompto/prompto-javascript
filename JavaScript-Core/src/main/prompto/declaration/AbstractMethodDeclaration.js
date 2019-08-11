var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var VoidType = require("../type/VoidType").VoidType;
var CodeParameter = require("../param/CodeParameter").CodeParameter;

function AbstractMethodDeclaration(id, args, returnType) {
	BaseMethodDeclaration.call(this, id, args, returnType);
    this.returnType = returnType || VoidType.instance;
	return this;
}

AbstractMethodDeclaration.prototype = Object.create(BaseMethodDeclaration.prototype);
AbstractMethodDeclaration.prototype.constructor = AbstractMethodDeclaration;

AbstractMethodDeclaration.prototype.memberCheck = function(declaration, context) {
    // TODO Auto-generated method stub
};

AbstractMethodDeclaration.prototype.check = function(context, isStart) {
	if(this.args!=null) {
		this.args.check(context);
	}
	if(isStart) {
	    var local = context.newLocalContext();
        this.registerArguments(local);
    }
	return this.returnType;
};

AbstractMethodDeclaration.prototype.declare = function(transpiler) {
    this.declareArguments(transpiler);
};

AbstractMethodDeclaration.prototype.transpile = function(transpiler) {
    // nothing to do
};

AbstractMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("abstract def ");
    writer.append(this.name);
    writer.append(" (");
    this.args.toDialect(writer);
    writer.append(")");
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("->");
        this.returnType.toDialect(writer);
    }
}

AbstractMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as abstract method ");
    this.args.toDialect(writer);
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("returning ");
        this.returnType.toDialect(writer);
    }
};

AbstractMethodDeclaration.prototype.toODialect = function(writer) {
    writer.append("abstract ");
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("method ");
    writer.append(this.name);
    writer.append(" (");
    this.args.toDialect(writer);
    writer.append(");");
}

exports.AbstractMethodDeclaration = AbstractMethodDeclaration;
