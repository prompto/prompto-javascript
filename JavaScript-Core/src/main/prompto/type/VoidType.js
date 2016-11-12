var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

function VoidType() {
	NativeType.call(this, new Identifier("Void"));
	return this;
}

VoidType.prototype = Object.create(NativeType.prototype);
VoidType.prototype.constructor = VoidType;

VoidType.prototype.isAssignableFrom = function(context, other) {
    throw new Error("Should never get there!");
};

VoidType.instance = new VoidType();


exports.VoidType = VoidType;
