import BinaryValue from './BinaryValue'
import { BlobType } from '../type'

export default class BlobValue extends BinaryValue {

    constructor(mimeType: string, data: ArrayBuffer) {
        super(BlobType.instance, mimeType, data);
    }
}
