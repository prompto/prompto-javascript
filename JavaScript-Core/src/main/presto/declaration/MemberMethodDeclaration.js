var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;

function MemberMethodDeclaration(name, arguments, returnType, instructions) {
	ConcreteMethodDeclaration.call(this, name, arguments, returnType, instructions);
	return this;
}

MemberMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
MemberMethodDeclaration.prototype.constructor = MemberMethodDeclaration;

MemberMethodDeclaration.prototype.memberCheck = function(declaration, context) {
		// TODO Auto-generated method stub
};

exports.MemberMethodDeclaration  = MemberMethodDeclaration;
