var CSharpLiteral = require("./CSharpLiteral").CSharpLiteral;

class CSharpCharacterLiteral extends CSharpLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.CSharpCharacterLiteral = CSharpCharacterLiteral;
