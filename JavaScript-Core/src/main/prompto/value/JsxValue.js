var Value = require("./Value").Value;
var JsxType = require("../type/JsxType").JsxType;

function JsxValue(expression) {
    Value.call(this, JsxType.instance);
	this.expression = expression;
	return this;
}

JsxValue.prototype = Object.create(Value.prototype);
JsxValue.prototype.constructor = JsxValue;

exports.JsxValue = JsxValue;
