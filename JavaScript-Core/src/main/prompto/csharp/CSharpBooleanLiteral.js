const CSharpLiteral = require("./CSharpLiteral").CSharpLiteral;

class CSharpBooleanLiteral extends CSharpLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.CSharpBooleanLiteral = CSharpBooleanLiteral;
