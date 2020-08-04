var JavaScriptLiteral = require("./JavaScriptLiteral").JavaScriptLiteral;
var IntegerType = require("../type/IntegerType").IntegerType;

class JavaScriptIntegerLiteral extends JavaScriptLiteral {
    constructor(text) {
        super(text);
        return this;
    }

    check(context) {
        return IntegerType.instance;
    }

    toString() {
        return this.value.toString();
    }
}

exports.JavaScriptIntegerLiteral = JavaScriptIntegerLiteral;

