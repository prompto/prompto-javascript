var Value = require("./Value").Value;
var UUIDType = require("../type/UUIDType").UUIDType;
var UUID = require("../intrinsic/UUID").UUID;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;

function UUIDValue(value) {
    if(typeof(value) == 'string') {
        value = UUID.fromString(value);
    }
    if(!(value instanceof UUID))
        throw new InvalidDataError("Not a UUID: " + typeof(value));
    Value.call(this, UUIDType.instance);
	this.value = value;
	return this;
}

UUIDValue.prototype = Object.create(Value.prototype);
UUIDValue.prototype.constructor = UUIDValue;

UUIDValue.prototype.toString = function() {
    return this.value.toString();
};


UUIDValue.prototype.getStorableData = function() {
    return this.value.toString();
};

exports.UUIDValue = UUIDValue;


