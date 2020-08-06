const Value = require("./Value").Value;
const AnyType = require("../type/AnyType").AnyType;

class AnyValue extends Value {
    constructor() {
        super(AnyType.instance);
        this.text = null;
        return this;
    }

    toString() {
        return "{id:" + this.id + ", text:" + this.text + "}";
    }
}

AnyValue.prototype.constructor = Value;

exports.AnyValue = AnyValue;

