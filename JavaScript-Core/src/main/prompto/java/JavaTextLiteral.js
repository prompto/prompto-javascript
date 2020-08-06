const JavaLiteral = require("./JavaLiteral").JavaLiteral;

class JavaTextLiteral extends JavaLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.JavaTextLiteral = JavaTextLiteral;
