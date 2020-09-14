import BinaryValue from "./BinaryValue"
import { ImageType } from "../type/index"

export default class ImageValue extends BinaryValue {

    constructor(mimeType, data) {
        super(ImageType.instance, mimeType, data);
    }
}
