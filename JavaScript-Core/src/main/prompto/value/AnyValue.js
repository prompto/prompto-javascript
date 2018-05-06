var Value = require("./Value").Value;
var AnyType = require("../type/AnyType").AnyType;

function AnyValue() {
    Value.call(this, AnyType.instance);
    this.text = null;
    return this;
}

AnyValue.prototype = Object.create(Value.prototype);
AnyValue.prototype.constructor = Value;

AnyValue.prototype.toString = function() {
    return "{id:" + this.id + ", text:" + this.text + "}";
};

exports.AnyValue = AnyValue;

