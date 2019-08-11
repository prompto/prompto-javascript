var BuiltInMethodDeclaration = null;
var EnumeratedNativeDeclaration = null;
var BaseType = require("./BaseType").BaseType;
var ListType = require("./ListType").ListType;
var TextType = require("./TextType").TextType;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var List = require("../intrinsic/List").List;
var CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
var Identifier = require("../grammar/Identifier").Identifier;

exports.resolve = function() {
	EnumeratedNativeDeclaration = require("../declaration/EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
	resolveBuiltInMethodDeclaration();
};

function EnumeratedNativeType(name, derivedFrom) {
	BaseType.call(this, name);
	this.derivedFrom = derivedFrom;
	return this;
}

EnumeratedNativeType.prototype = Object.create(BaseType.prototype);
EnumeratedNativeType.prototype.constructor = EnumeratedNativeType;

EnumeratedNativeType.prototype.checkMember = function(context, section, name) {
	if ("symbols"==name) {
		return new ListType(this);
	} else if ("value"==name) {
		return this.derivedFrom;
	} else if ("name"==name) {
		return TextType.instance;
	} else {
		return BaseType.prototype.checkMember.call(this, context, section, name);
	}
};

EnumeratedNativeType.prototype.declare = function(transpiler) {
    var decl = transpiler.context.getRegisteredDeclaration(this.name);
    transpiler.declare(decl);
    transpiler.require(List);
};


EnumeratedNativeType.prototype.transpile = function(transpiler) {
    transpiler.append(this.name);
};

EnumeratedNativeType.prototype.declareMember = function(transpiler, name) {
    if("symbols"==name || "value"==name || "name"==name) {
        var decl = transpiler.context.getRegisteredDeclaration(this.name);
        transpiler.declare(decl);
    } else
        BaseType.prototype.declareMember.call(this, transpiler, name);
};

EnumeratedNativeType.prototype.transpileMember = function(transpiler, name) {
    if ("symbols"==name || "value"==name || "name"==name) {
        transpiler.append(name);
    } else {
        return BaseType.prototype.transpileMember.call(this, transpiler, name);
    }
};


EnumeratedNativeType.prototype.getMemberValue = function(context, name) {
	var decl = context.getRegisteredDeclaration(this.name);
	if(!decl || !decl.symbols) {
		throw new SyntaxError(name + " is not an enumerated type!");
	}
	if ("symbols"==name) {
		return decl.symbols;
	} else {
		throw new SyntaxError("Unknown member:" + name);
	}
};


EnumeratedNativeType.prototype.isAssignableFrom = function(context, other) {
	return this.id.name === other.id.name;
};


EnumeratedNativeType.prototype.getMemberMethods = function(context, name) {
	switch (name) {
		case "symbolOf":
			return [new SymbolOfMethodDeclaration(this)];
		default:
			return BaseType.prototype.getMemberMethods.call(this, context, name);
	}
};


function SymbolOfMethodDeclaration(enumType) {
	BuiltInMethodDeclaration.call(this, "symbolOf", new CategoryParameter(TextType.instance, new Identifier("name")));
	this.enumType = enumType;
	return this;
}

function resolveBuiltInMethodDeclaration() {

	BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;

	SymbolOfMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
	SymbolOfMethodDeclaration.prototype.constructor = SymbolOfMethodDeclaration;

	SymbolOfMethodDeclaration.prototype.check = function (context) {
		return this.enumType;
	};

	SymbolOfMethodDeclaration.prototype.interpret = function (context) {
		var decl = context.getRegistered(this.enumType.name);
		if(!(decl instanceof EnumeratedNativeDeclaration))
			throw new SyntaxError(this.enumType.typeName + " is not an enumerated type!");
		var name = context.getValue(new Identifier("name")).getStorableData();
		return decl.getSymbol(name);
	};

	SymbolOfMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
		transpiler.append("symbolOf(");
		assignments[0].transpile(transpiler);
		transpiler.append(")");
	};

}


exports.EnumeratedNativeType = EnumeratedNativeType;
