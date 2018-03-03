var NativeType = require("./NativeType").NativeType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;
var UUIDValue = null;
var UUIDjs = require("../utils/UUIDjs").UUIDjs;

exports.resolve = function() {
    UUIDValue = require("../value/UUIDValue").UUIDValue;
}


function UUIDType()  {
	NativeType.call(this, new Identifier("UUID"));
	return this;
}

UUIDType.prototype = Object.create(NativeType.prototype);
UUIDType.prototype.constructor = UUIDType;

UUIDType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    if(value instanceof UUIDjs) {
        return new UUIDValue(value);
    } else {
        return value; // TODO for now
    }
};

UUIDType.instance = new UUIDType();

exports.UUIDType = UUIDType;