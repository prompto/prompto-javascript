import BinaryValue from "./BinaryValue"
import { BlobType } from "../type/index"

export default class BlobValue extends BinaryValue {

    constructor(mimeType, data) {
        super(BlobType.instance, mimeType, data);
    }
}
