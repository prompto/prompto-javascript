var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;

function IterableType(id, itemType) {
	NativeType.call(this, id);
	this.itemType = itemType;
	return this;
}

IterableType.prototype = Object.create(NativeType.prototype);
IterableType.prototype.constructor = IterableType;


IterableType.prototype.isMoreSpecificThan = function(context, other) {
    return (other instanceof IterableType &&
        this.itemType.isMoreSpecificThan(context, other.itemType));
};

exports.IterableType = IterableType;

