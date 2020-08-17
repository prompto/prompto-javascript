
export default class BlobValue extends BinaryValue {
    constructor(mimeType, data) {
        super(BlobType.instance, mimeType, data);
        return this;
    }
}
