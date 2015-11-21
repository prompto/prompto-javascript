var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;

function IterableType(id, itemType) {
	NativeType.call(this, id);
	this.itemType = itemType;
	return this;
}

IterableType.prototype = Object.create(NativeType.prototype);
IterableType.prototype.constructor = IterableType;

exports.IterableType = IterableType;

