var JavaLiteral = require("./JavaLiteral").JavaLiteral;

class JavaIntegerLiteral extends JavaLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.JavaIntegerLiteral = JavaIntegerLiteral;

