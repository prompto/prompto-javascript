const JavaScriptLiteral = require("./JavaScriptLiteral").JavaScriptLiteral;
const DecimalType = require("../type/DecimalType").DecimalType;


class JavaScriptDecimalLiteral extends JavaScriptLiteral {
    constructor(text) {
        super(text);
        return this;
    }

    check(context) {
        return DecimalType.instance;
    }

    toString() {
        return this.value.toString();
    }
}

exports.JavaScriptDecimalLiteral = JavaScriptDecimalLiteral;

