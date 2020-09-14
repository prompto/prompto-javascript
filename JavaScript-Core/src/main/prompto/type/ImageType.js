import BinaryType from "./BinaryType"
import { Identifier } from "../grammar/index"

export default class ImageType extends BinaryType {

    constructor() {
        super(new Identifier("Image"));
    }
}

ImageType.instance = new ImageType();
