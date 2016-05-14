var BinaryType = require("./BinaryType").BinaryType;
var Identifier = require("../grammar/Identifier").Identifier;

function ImageType() {
    BinaryType.call(this, new Identifier("Image"));
    return this;
}

ImageType.prototype = Object.create(BinaryType.prototype);
ImageType.prototype.constructor = ImageType;

ImageType.instance = new ImageType();

exports.ImageType = ImageType;