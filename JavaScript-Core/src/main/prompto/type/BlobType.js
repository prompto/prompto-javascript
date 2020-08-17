
export default class BlobType extends BinaryType {

    constructor() {
        super(new Identifier("Blob"));
    }
}

BlobType.instance = new BlobType();
