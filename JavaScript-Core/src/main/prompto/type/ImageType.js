const BinaryType = require("./BinaryType").BinaryType;
const Identifier = require("../grammar/Identifier").Identifier;

class ImageType extends BinaryType {
    constructor() {
        super(new Identifier("Image"));
        return this;
    }
}

ImageType.instance = new ImageType();

exports.ImageType = ImageType;