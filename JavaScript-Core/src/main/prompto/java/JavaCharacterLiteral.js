const JavaLiteral = require("./JavaLiteral").JavaLiteral;

class JavaCharacterLiteral extends JavaLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.JavaCharacterLiteral = JavaCharacterLiteral;
