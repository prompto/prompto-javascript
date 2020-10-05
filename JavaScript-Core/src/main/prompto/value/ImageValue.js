import BinaryValue from './BinaryValue.js'
import { ImageType } from '../type/index.js'

export default class ImageValue extends BinaryValue {

    constructor(mimeType, data) {
        super(ImageType.instance, mimeType, data);
    }
}
