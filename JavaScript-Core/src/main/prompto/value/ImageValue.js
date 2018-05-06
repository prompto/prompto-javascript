var BinaryValue = require("./BinaryValue").BinaryValue;
var ImageType = require("../type/ImageType").ImageType;

function ImageValue(mimeType, data) {
    BinaryValue.call(this, ImageType.instance, mimeType, data);
    return this;
}

ImageValue.prototype = Object.create(BinaryValue.prototype);
ImageValue.prototype.constructor = ImageValue;

exports.ImageValue = ImageValue;