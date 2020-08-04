var NativeCategoryDeclaration = require("./NativeCategoryDeclaration").NativeCategoryDeclaration;
var Identifier = require("../grammar/Identifier").Identifier;

class AnyNativeCategoryDeclaration extends NativeCategoryDeclaration {
    constructor() {
        super(new Identifier("Any"), [], [], [], []);
        return this;
    }
}

AnyNativeCategoryDeclaration.instance = new AnyNativeCategoryDeclaration();

exports.AnyNativeCategoryDeclaration = AnyNativeCategoryDeclaration;
