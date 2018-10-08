var ConcreteMethodDeclaration = require("../declaration/ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var ExpressionValue = require("../value/ExpressionValue").ExpressionValue;
var ClosureValue = require("../value/ClosureValue").ClosureValue;
var BaseStatement = require("./BaseStatement").BaseStatement;
var MethodType = require("../type/MethodType").MethodType;
var VoidType = require("../type/VoidType").VoidType;
var Variable = require("../runtime/Variable").Variable;
var InstanceContext = require("../runtime/Context").InstanceContext;

function DeclarationStatement(declaration) {
	BaseStatement.call(this);
	this.declaration = declaration;
    this.declaration.declarationStatement = this;
	return this;
}

DeclarationStatement.prototype = Object.create(BaseStatement.prototype);
DeclarationStatement.prototype.constructor = DeclarationStatement;

DeclarationStatement.prototype.toDialect = function(writer) {
    if(this.declaration instanceof ConcreteMethodDeclaration) try {
        writer.context.registerMethodDeclaration(this.declaration);
     } catch(e) {
        // ok
     }
    this.declaration.toDialect(writer);
};


DeclarationStatement.prototype.check = function(context) {
	if(this.declaration instanceof ConcreteMethodDeclaration) {
		this.declaration.checkChild(context);
		context.registerMethodDeclaration(this.declaration);
	} else {
		throw new SyntaxError("Unsupported:" + typeof(declaration));
	}
	return VoidType.instance;
};

DeclarationStatement.prototype.interpret = function(context) {
	if(this.declaration instanceof ConcreteMethodDeclaration) {
		var method = this.declaration;
		context.registerMethodDeclaration(method);
		var type = new MethodType(method);
		context.registerValue(new Variable(method.id, type));
		context.setValue(method.id, new ClosureValue(context, type));
		return null;
	} else {
		throw new SyntaxError("Unsupported:" + typeof(this.declaration));
	}
};

DeclarationStatement.prototype.declare = function(transpiler) {
	this.declaration.declareChild(transpiler);
    transpiler.context.registerMethodDeclaration(this.declaration);
};

DeclarationStatement.prototype.transpile = function(transpiler) {
    this.declaration.transpile(transpiler);
    transpiler.context.registerMethodDeclaration(this.declaration);
    var instance = transpiler.context.getClosestInstanceContext();
    if(instance!=null) {
        var name = this.declaration.getTranspiledName(transpiler.context);
        transpiler.append(name).append(" = ").append(name).append(".bind(this);").newLine();
    }
    return true;
};

exports.DeclarationStatement = DeclarationStatement;
