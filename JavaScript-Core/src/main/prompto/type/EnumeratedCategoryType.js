var BuiltInMethodDeclaration = null;
var EnumeratedCategoryDeclaration = null;
var CategoryType = require("./CategoryType").CategoryType;
var BaseType = require("./BaseType").BaseType;
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

EnumeratedCategoryType.prototype.checkMember = function(context, section, id) {
    var name = id.toString();
    if ("name"==name) {
        return TextType.instance;
    } else {
        return CategoryType.prototype.checkMember.call(this, context, section, id);
    }
};


EnumeratedCategoryType.prototype.checkStaticMember = function(context, section, id) {
    var name = id.toString();
    if ("symbols"==name) {
        return new ListType(this);
    } else {
        return CategoryType.prototype.checkStaticMember.call(this, context, section, id);
    }
};


EnumeratedCategoryType.prototype.declareStaticMember = function(transpiler, section, name) {
    if("symbols"==name) {
        var decl = transpiler.context.getRegisteredDeclaration(this.name);
        transpiler.declare(decl);
    } else
        BaseType.prototype.declareStaticMember.call(this, transpiler, section, name);
};


EnumeratedCategoryType.prototype.transpileStaticMember = function(transpiler, name) {
    if ("symbols"==name) {
        transpiler.append(name);
    } else {
        return BaseType.prototype.transpileStaticMember.call(this, transpiler, name);
    }
};


EnumeratedCategoryType.prototype.getStaticMemberValue = function(context, name) {
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

EnumeratedCategoryType.prototype.getStaticMemberMethods = function(context, name) {
    switch (name) {
        case "symbolOf":
            return [new SymbolOfMethodDeclaration(this)];
        default:
            return [];
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