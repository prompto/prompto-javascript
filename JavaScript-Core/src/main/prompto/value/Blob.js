var BinaryValue = require("./BinaryValue").BinaryValue;
var BlobType = require("../type/BlobType").BlobType;

function Blob(mimeType, data) {
    BinaryValue.call(this, BlobType.instance, mimeType, data);
    return this;
}

Blob.prototype = Object.create(BinaryValue.prototype);
Blob.prototype.constructor = Blob;

exports.Blob = Blob;