var BinaryType = require("./BinaryType").BinaryType;

function BlobType() {
    BinaryType.call(this, "Blob");
    return this;
}

BlobType.prototype = Object.create(BinaryType.prototype);
BlobType.prototype.constructor = BlobType;

BlobType.instance = new BlobType();

BlobType.prototype.isAssignableTo = function(context, other) {
    return (other instanceof BlobType);
};

exports.BlobType = BlobType;