var BinaryValue = require("./BinaryValue").BinaryValue;
var BlobType = require("../type/BlobType").BlobType;

function BlobValue(mimeType, data) {
    BinaryValue.call(this, BlobType.instance, mimeType, data);
    return this;
}

BlobValue.prototype = Object.create(BinaryValue.prototype);
BlobValue.prototype.constructor = BlobValue;

exports.BlobValue = BlobValue;