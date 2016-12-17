var CategoryType = require("./CategoryType").CategoryType;
var ListType = require("./ListType").ListType;
var TextType = require("./TextType").TextType;
var SyntaxError = require("../error/SyntaxError").SyntaxError;



function EnumeratedCategoryType(id) {
	CategoryType.call(this, id);
	return this;
}

EnumeratedCategoryType.prototype = Object.create(CategoryType.prototype);
EnumeratedCategoryType.prototype.constructor =  EnumeratedCategoryType;

EnumeratedCategoryType.prototype.checkMember = function(context, name) {
    if ("symbols"==name) {
        return new ListType(this);
    } else if ("name"==name) {
        return TextType.instance;
    } else {
        return CategoryType.prototype.checkMember.call(this, context, name);
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

exports.EnumeratedCategoryType = EnumeratedCategoryType;