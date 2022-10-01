import BinaryValue from './BinaryValue'
import { ImageType } from '../type'

export default class ImageValue extends BinaryValue {

    constructor(mimeType: string, data: Uint8Array) {
        super(ImageType.instance, mimeType, data);
    }
}
