var AbstractMethodDeclaration = require("./AbstractMethodDeclaration").AbstractMethodDeclaration;

function ClosureDeclaration(closure) {
    AbstractMethodDeclaration.call(this, closure.type.method.id, closure.type.method.parameters, closure.type.method.returnType);
	this.closure = closure;
	return this;
}

ClosureDeclaration.prototype = Object.create(AbstractMethodDeclaration.prototype);
ClosureDeclaration.prototype.constructor = ClosureDeclaration;

ClosureDeclaration.prototype.interpret = function(context) {
	return this.closure.interpret(context);
};

exports.ClosureDeclaration = ClosureDeclaration;
