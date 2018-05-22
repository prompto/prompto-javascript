var BaseType = require("./BaseType").BaseType;
var ListType = require("./ListType").ListType;
var TextType = require("./TextType").TextType;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var List = require("../intrinsic/List").List;

function EnumeratedNativeType(name, derivedFrom) {
	BaseType.call(this, name);
	this.derivedFrom = derivedFrom;
	return this;
}

EnumeratedNativeType.prototype = Object.create(BaseType.prototype);
EnumeratedNativeType.prototype.constructor = EnumeratedNativeType;

EnumeratedNativeType.prototype.checkMember = function(context, name) {
	if ("symbols"==name) {
		return new ListType(this);
	} else if ("value"==name) {
		return this.derivedFrom;
	} else if ("name"==name) {
		return TextType.instance;
	} else {
		return BaseType.prototype.checkMember.call(this, context, name);
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
    if ("symbols"==name) {
        transpiler.append("symbols");
    } else if ("value"==name || "name"==name) {
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

exports.EnumeratedNativeType = EnumeratedNativeType;
