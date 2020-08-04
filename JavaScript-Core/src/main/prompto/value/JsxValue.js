var Value = require("./Value").Value;
var JsxType = require("../type/JsxType").JsxType;

class JsxValue extends Value {
    constructor(expression) {
        super(JsxType.instance);
        this.expression = expression;
        return this;
    }
}

exports.JsxValue = JsxValue;
