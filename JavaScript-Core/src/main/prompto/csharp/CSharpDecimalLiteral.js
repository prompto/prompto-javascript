var CSharpLiteral = require("./CSharpLiteral").CSharpLiteral;

class CSharpDecimalLiteral extends CSharpLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.CSharpDecimalLiteral = CSharpDecimalLiteral;
