var JavaScriptLiteral = require("./JavaScriptLiteral").JavaScriptLiteral;
var TextType = require("../type/TextType").TextType;

class JavaScriptTextLiteral extends JavaScriptLiteral {
    constructor(text) {
        super(text);
        return this;
    }

    check(context) {
        return TextType.instance;
    }
}

exports.JavaScriptTextLiteral = JavaScriptTextLiteral;

