const JavaScriptLiteral = require("./JavaScriptLiteral").JavaScriptLiteral;
const TextType = require("../type/TextType").TextType;

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

