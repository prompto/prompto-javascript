var BinaryValue = require("./BinaryValue").BinaryValue;
var BlobType = require("../type/BlobType").BlobType;

class BlobValue extends BinaryValue {
    constructor(mimeType, data) {
        super(BlobType.instance, mimeType, data);
        return this;
    }
}

exports.BlobValue = BlobValue;