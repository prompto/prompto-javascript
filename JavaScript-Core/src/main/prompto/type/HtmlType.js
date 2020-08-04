var NativeType = require("./NativeType").NativeType;
var JsxType = require("./JsxType").JsxType;
var Identifier = require("../grammar/Identifier").Identifier;

class HtmlType extends NativeType {
    constructor() {
        super(new Identifier("Html"));
        return this;
    }

    isAssignableFrom(context, other) {
        if(other===JsxType.instance)
            return true;
        else
            return NativeType.prototype.isAssignableFrom.call(this, context, other);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append('Html');
    }
}


HtmlType.instance = new HtmlType();

exports.HtmlType = HtmlType;