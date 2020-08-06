const NativeType = require("./NativeType").NativeType;
const Identifier = require("../grammar/Identifier").Identifier;

class JsxType extends NativeType {
    constructor() {
        super(new Identifier("Jsx"));
        return this;
    }
}


JsxType.instance = new JsxType();

exports.JsxType = JsxType;