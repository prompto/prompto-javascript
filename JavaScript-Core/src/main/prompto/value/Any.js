var Value = require("./Value").Value;
var AnyType = require("../type/AnyType").AnyType;

function Any() {
    Value.call(this, AnyType.instance);
    this.text = null;
    return this;
}

Any.prototype = Object.create(Value.prototype);
Any.prototype.constructor = Value;

Any.prototype.toString = function() {
    return "{id:" + this.id + ", text:" + this.text + "}";
};

exports.Any = Any;

