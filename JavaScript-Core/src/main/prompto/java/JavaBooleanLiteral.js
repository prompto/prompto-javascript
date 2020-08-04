var JavaLiteral = require("./JavaLiteral").JavaLiteral;

class JavaBooleanLiteral extends JavaLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.JavaBooleanLiteral = JavaBooleanLiteral;
