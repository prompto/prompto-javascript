const BinaryValue = require("./BinaryValue").BinaryValue;
const ImageType = require("../type/ImageType").ImageType;

class ImageValue extends BinaryValue {
    constructor(mimeType, data) {
        super(ImageType.instance, mimeType, data);
        return this;
    }
}

exports.ImageValue = ImageValue;