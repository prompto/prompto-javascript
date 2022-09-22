import BinaryValue from '../../../main/prompto/value/BinaryValue.ts'
import { ImageType } from '../type'

export default class ImageValue extends BinaryValue {

    constructor(mimeType, data) {
        super(ImageType.instance, mimeType, data);
    }
}
