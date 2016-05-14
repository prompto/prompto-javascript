var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

function VoidType() {
	NativeType.call(this, new Identifier("Void"));
	return this;
}

VoidType.prototype = Object.create(NativeType.prototype);
VoidType.prototype.constructor = VoidType;

VoidType.instance = new VoidType();


exports.VoidType = VoidType;
