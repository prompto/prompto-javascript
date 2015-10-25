var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;

function ContainerType(id, itemType) {
	NativeType.call(this, id);
	this.itemType = itemType;
	return this;
}

ContainerType.prototype = Object.create(NativeType.prototype);
ContainerType.prototype.constructor = ContainerType;

/*
public IType getItemType() {
	return itemType;
}

@Override
public void checkExists(Context context) throws SyntaxError {
	itemType.checkExists(context);
}
*/

ContainerType.prototype.checkContains = function(context, other) {
	if(this.itemType.isAssignableTo(context, other)) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkContains.call(this, context, other);
	}
};

exports.ContainerType = ContainerType;

