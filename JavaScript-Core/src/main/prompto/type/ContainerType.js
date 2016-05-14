var IterableType = require("./IterableType").IterableType;
var BooleanType = require("./BooleanType").BooleanType;

function ContainerType(id, itemType) {
    IterableType.call(this, id);
	this.itemType = itemType;
	return this;
}

ContainerType.prototype = Object.create(IterableType.prototype);
ContainerType.prototype.constructor = ContainerType;

ContainerType.prototype.checkContains = function(context, other) {
	if(other.isAssignableFrom(context, this.itemType)) {
		return BooleanType.instance;
	} else {
		return IterableType.prototype.checkContains.call(this, context, other);
	}
};

exports.ContainerType = ContainerType;

