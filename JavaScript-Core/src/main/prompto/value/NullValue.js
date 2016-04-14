var Value = require("./Value").Value;

function NullValue() {
    Value.call(this, null);
    return this;
}

NullValue.prototype = Object.create(Value.prototype);
NullValue.prototype.constructor = NullValue;

NullValue.prototype.toString = function() {
    return "null";
};

NullValue.instance = new NullValue();

exports.NullValue = NullValue;
