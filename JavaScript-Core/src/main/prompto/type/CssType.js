var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

function CssType () {
    NativeType.call(this, new Identifier("Css"));
    return this;
}

CssType.prototype = Object.create(NativeType.prototype);
CssType.prototype.constructor = CssType;


CssType.instance = new CssType();

exports.CssType = CssType;