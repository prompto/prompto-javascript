var NativeType = require("./NativeType").NativeType;
var TypeFamily = require("../store/TypeFamily").TypeFamily;

function JsxType () {
    NativeType.call(this, TypeFamily.JSX);
    return this;
}

JsxType.prototype = Object.create(NativeType.prototype);
JsxType.prototype.constructor = JsxType;


JsxType.instance = new JsxType();

exports.JsxType = JsxType;