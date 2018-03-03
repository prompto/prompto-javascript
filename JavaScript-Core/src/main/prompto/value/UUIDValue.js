var Value = require("./Value").Value;
var UUIDType = require("../type/UUIDType").UUIDType;
var UUIDjs = require("../utils/UUIDjs").UUIDjs;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;

function UUIDValue(value) {
    if(typeof(value) == 'string') {
        value = UUIDjs.fromString(value);
    }
    if(!(value instanceof UUIDjs))
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


