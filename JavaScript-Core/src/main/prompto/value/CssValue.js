const Value = require("./Value").Value;
const CssType = require("../type/CssType").CssType;

class CssValue extends Value {
    constructor(expression) {
        super(CssType.instance);
        this.expression = expression;
        return this;
    }
}

exports.CssValue = CssValue;
