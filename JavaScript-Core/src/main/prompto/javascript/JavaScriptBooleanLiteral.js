var JavaScriptLiteral = require("./JavaScriptLiteral").JavaScriptLiteral;
var BooleanType = require("../type/BooleanType").BooleanType;

class JavaScriptBooleanLiteral extends JavaScriptLiteral {
    constructor(text) {
        super(text);
        return this;
    }

    check(context) {
        return BooleanType.instance;
    }
}

exports.JavaScriptBooleanLiteral = JavaScriptBooleanLiteral;