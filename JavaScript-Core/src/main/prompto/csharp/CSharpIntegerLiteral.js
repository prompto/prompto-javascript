const CSharpLiteral = require("./CSharpLiteral").CSharpLiteral;

class CSharpIntegerLiteral extends CSharpLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.CSharpIntegerLiteral = CSharpIntegerLiteral;
