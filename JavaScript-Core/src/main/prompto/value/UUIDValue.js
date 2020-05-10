var Value = require("./Value").Value;
var TextValue = require("./TextValue").TextValue;
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


UUIDValue.prototype.equals = function(obj) {
    if (obj instanceof UUIDValue) {
        return this.value.equals(obj.value);
    } else {
        return false;
    }
};


UUIDValue.prototype.toDocumentValue = function(context) {
    return new TextValue(this.toString());
};


exports.UUIDValue = UUIDValue;


