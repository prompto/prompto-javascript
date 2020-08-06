const JavaLiteral = require("./JavaLiteral").JavaLiteral;

class JavaDecimalLiteral extends JavaLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.JavaDecimalLiteral = JavaDecimalLiteral;

