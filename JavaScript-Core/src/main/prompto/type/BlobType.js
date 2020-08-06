const BinaryType = require("./BinaryType").BinaryType;
const Identifier = require("../grammar/Identifier").Identifier;

class BlobType extends BinaryType {
    constructor() {
        super(new Identifier("Blob"));
        return this;
    }
}

BlobType.instance = new BlobType();

exports.BlobType = BlobType;