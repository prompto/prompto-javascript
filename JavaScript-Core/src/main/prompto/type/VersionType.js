var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;

function VersionType()  {
	NativeType.call(this, new Identifier("Version"));
	return this;
}

VersionType.prototype = Object.create(NativeType.prototype);
VersionType.prototype.constructor = VersionType;

VersionType.instance = new VersionType();


VersionType.prototype.checkCompare = function(context, other) {
	if (other instanceof VersionType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other);
	}
};

exports.VersionType = VersionType;
