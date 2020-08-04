var BinaryValue = require("./BinaryValue").BinaryValue;
var ImageType = require("../type/ImageType").ImageType;

class ImageValue extends BinaryValue {
    constructor(mimeType, data) {
        super(ImageType.instance, mimeType, data);
        return this;
    }
}

exports.ImageValue = ImageValue;