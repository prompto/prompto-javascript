var Value = require("./Value").Value;
var UUIDType = require("../type/UUIDType").UUIDType;
var UUIDjs = require("../utils/UUIDjs").UUIDjs;

function UUIDValue(value) {
    if(!(value instanceof UUIDjs))
        value = UUIDjs.fromURN(value.toString());
    Value.call(this, UUIDType.instance);
	this.value = value;
	return this;
}

UUIDValue.prototype = Object.create(Value.prototype);
UUIDValue.prototype.constructor = UUIDValue;

UUIDValue.prototype.toString = function() {
    return this.value.toString();
};


exports.UUIDValue = UUIDValue;


