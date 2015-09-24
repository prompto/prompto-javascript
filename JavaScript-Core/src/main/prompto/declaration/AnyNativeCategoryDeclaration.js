var NativeCategoryDeclaration = require("./NativeCategoryDeclaration").NativeCategoryDeclaration;
var Identifier = require("../grammar/Identifier").Identifier;

function AnyNativeCategoryDeclaration() {
    NativeCategoryDeclaration.call(this, new Identifier("Any"), [], [], [], []);
    return this;
}

AnyNativeCategoryDeclaration.prototype = Object.create(NativeCategoryDeclaration.prototype);
AnyNativeCategoryDeclaration.prototype.constructor = AnyNativeCategoryDeclaration;

AnyNativeCategoryDeclaration.instance = new AnyNativeCategoryDeclaration();

exports.AnyNativeCategoryDeclaration = AnyNativeCategoryDeclaration;
