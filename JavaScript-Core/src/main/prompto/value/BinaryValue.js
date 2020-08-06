const Value = require("./Value").Value;

class BinaryValue extends Value {
    constructor(itype, mimeType, data) {
        super(itype);
        this.mimeType = mimeType;
        this.data = data;
        return this;
    }
}

exports.BinaryValue = BinaryValue;