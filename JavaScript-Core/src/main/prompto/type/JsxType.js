var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

function JsxType () {
    NativeType.call(this, new Identifier("Jsx"));
    return this;
}

JsxType.prototype = Object.create(NativeType.prototype);
JsxType.prototype.constructor = JsxType;


JsxType.instance = new JsxType();

exports.JsxType = JsxType;