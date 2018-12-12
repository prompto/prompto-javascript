var NativeType = require("./NativeType").NativeType;
var JsxType = require("./JsxType").JsxType;
var Identifier = require("../grammar/Identifier").Identifier;

function HtmlType () {
    NativeType.call(this, new Identifier("Html"));
    return this;
}

HtmlType.prototype = Object.create(NativeType.prototype);
HtmlType.prototype.constructor = HtmlType;


HtmlType.prototype.isAssignableFrom = function(context, other) {
    if(other===JsxType.instance)
        return true;
    else
        return NativeType.prototype.isAssignableFrom.call(this, context, other);
};

HtmlType.prototype.declare = function(transpiler) {
    // nothing to do
};


HtmlType.prototype.transpile = function(transpiler) {
    transpiler.append('Html');
};


HtmlType.instance = new HtmlType();

exports.HtmlType = HtmlType;