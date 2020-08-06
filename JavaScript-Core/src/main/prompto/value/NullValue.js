const Value = require("./Value").Value;
const NullType = require("../type/NullType").NullType;

class NullValue extends Value {
    constructor() {
        super(NullType.instance);
        return this;
    }

    toString() {
        return "null";
    }

    getStorableData() {
        return null; // <- YES!
    }

    convertToJavaScript() {
        return null; // <- YES!
    }
}

NullValue.instance = new NullValue();

exports.NullValue = NullValue;
