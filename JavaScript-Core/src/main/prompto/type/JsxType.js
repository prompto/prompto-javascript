var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

class JsxType extends NativeType {
    constructor() {
        super(new Identifier("Jsx"));
        return this;
    }
}


JsxType.instance = new JsxType();

exports.JsxType = JsxType;