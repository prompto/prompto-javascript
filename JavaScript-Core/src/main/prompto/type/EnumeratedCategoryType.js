var BuiltInMethodDeclaration = null;
var EnumeratedCategoryDeclaration = null;
var CategoryType = require("./CategoryType").CategoryType;
var ListType = require("./ListType").ListType;
var TextType = require("./TextType").TextType;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
var Identifier = require("../grammar/Identifier").Identifier;

exports.resolve = function() {
    EnumeratedCategoryDeclaration = require("../declaration/EnumeratedCategoryDeclaration").EnumeratedCategoryDeclaration;
    resolveBuiltInMethodDeclaration();
};



function EnumeratedCategoryType(id) {
	CategoryType.call(this, id);
	return this;
}

EnumeratedCategoryType.prototype = Object.create(CategoryType.prototype);
EnumeratedCategoryType.prototype.constructor =  EnumeratedCategoryType;

EnumeratedCategoryType.prototype.checkMember = function(context, section, name) {
    if ("symbols"==name) {
        return new ListType(this);
    } else if ("name"==name) {
        return TextType.instance;
    } else {
        return CategoryType.prototype.checkMember.call(this, context, section, name);
    }
};


EnumeratedCategoryType.prototype.getMemberValue = function(context, name) {
    var decl = context.getRegisteredDeclaration(this.name);
    if (!decl || !decl.symbols) {
        throw new SyntaxError(name + " is not an enumerated type!");
    }
    if ("symbols" == name) {
        return decl.symbols;
    } else {
        throw new SyntaxError("Unknown member:" + name);
    }
};

EnumeratedCategoryType.prototype.getMemberMethods = function(context, name) {
    switch (name) {
        case "symbolOf":
            return [new SymbolOfMethodDeclaration(this)];
        default:
            return CategoryType.prototype.getMemberMethods.call(this, context, name);
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
        if(!(decl instanceof EnumeratedCategoryDeclaration))
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


exports.EnumeratedCategoryType = EnumeratedCategoryType;