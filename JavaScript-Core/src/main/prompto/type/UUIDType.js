var NativeType = require("./NativeType").NativeType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;

function UUIDType()  {
	NativeType.call(this, new Identifier("UUID"));
	return this;
}

UUIDType.prototype = Object.create(NativeType.prototype);
UUIDType.prototype.constructor = UUIDType;

UUIDType.instance = new UUIDType();

exports.UUIDType = UUIDType;