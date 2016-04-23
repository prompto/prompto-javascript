var Value = require("./Value").Value;

function BinaryValue(itype, mimeType, data) {
    Value.call(this, itype);
    this.mimeType = mimeType;
    this.data = data;
    return this;
}

BinaryValue.prototype = Object.create(Value.prototype);
BinaryValue.prototype.constructor = BinaryValue;

exports.BinaryValue = BinaryValue;