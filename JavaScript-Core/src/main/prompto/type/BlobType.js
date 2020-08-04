var BinaryType = require("./BinaryType").BinaryType;
var Identifier = require("../grammar/Identifier").Identifier;

class BlobType extends BinaryType {
    constructor() {
        super(new Identifier("Blob"));
        return this;
    }
}

BlobType.instance = new BlobType();

exports.BlobType = BlobType;