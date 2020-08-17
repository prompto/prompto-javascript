
export default class ImageValue extends BinaryValue {

    constructor(mimeType, data) {
        super(ImageType.instance, mimeType, data);
    }
}
