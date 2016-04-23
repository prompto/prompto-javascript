var BinaryValue = require("./BinaryValue").BinaryValue;
var ImageType = require("../type/ImageType").ImageType;

function Image(mimeType, data) {
    BinaryValue.call(this, ImageType.instance, mimeType, data);
    return this;
}

Image.prototype = Object.create(BinaryValue.prototype);
Image.prototype.constructor = Image;

exports.Image = Image;