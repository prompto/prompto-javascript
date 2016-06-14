var Value = require("./Value").Value;
var UUIDType = require("../type/UUIDType").UUIDType;

function UUIDValue(value) {
    Value.call(this, UUIDType.instance);
	this.value = value;
	return this;
}

UUIDValue.prototype = Object.create(Value.prototype);
UUIDValue.prototype.constructor = UUIDValue;

UUIDValue.prototype.toString = function() {
    return "" + this.value;
};


exports.UUIDValue = UUIDValue;


