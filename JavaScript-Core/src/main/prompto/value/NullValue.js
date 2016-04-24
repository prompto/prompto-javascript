var Value = require("./Value").Value;
var NullType = require("../type/NullType").NullType;

function NullValue() {
    Value.call(this, NullType.instance);
    return this;
}

NullValue.prototype = Object.create(Value.prototype);
NullValue.prototype.constructor = NullValue;

NullValue.prototype.toString = function() {
    return "null";
};

NullValue.instance = new NullValue();

exports.NullValue = NullValue;
