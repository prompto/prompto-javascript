var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;

function CollectionType(id, itemType) {
	NativeType.call(this, id);
	this.itemType = itemType;
	return this;
}

CollectionType.prototype = Object.create(NativeType.prototype);
CollectionType.prototype.constructor = CollectionType;

/*
public IType getItemType() {
	return itemType;
}

@Override
public void checkExists(Context context) throws SyntaxError {
	itemType.checkExists(context);
}
*/

CollectionType.prototype.checkContains = function(context, other) {
	if(this.itemType.isAssignableTo(context, other)) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkContains.call(this, context, other);
	}
};

exports.CollectionType = CollectionType;

