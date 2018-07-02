var Value = require("./Value").Value;
var CssType = require("../type/CssType").CssType;

function CssValue(expression) {
    Value.call(this, CssType.instance);
	this.expression = expression;
	return this;
}

CssValue.prototype = Object.create(Value.prototype);
CssValue.prototype.constructor = CssValue;

exports.CssValue = CssValue;
