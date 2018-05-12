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


ContainerType.prototype.checkMember = function(context, name) {
    if ("count" == name) {
        var IntegerType = require("./IntegerType").IntegerType;
        return IntegerType.instance;
    } else {
        return IterableType.prototype.checkMember.call(this, context, name);
    }
};

ContainerType.prototype.transpileMember = function(transpiler, name) {
    if ("count" == name) {
        transpiler.append("length");
    } else {
        return IterableType.prototype.transpileMember.call(this, transpiler, name);
    }
};

exports.ContainerType = ContainerType;

