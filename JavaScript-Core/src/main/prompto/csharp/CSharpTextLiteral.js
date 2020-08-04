var CSharpLiteral = require("./CSharpLiteral").CSharpLiteral;

class CSharpTextLiteral extends CSharpLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.CSharpTextLiteral = CSharpTextLiteral;
