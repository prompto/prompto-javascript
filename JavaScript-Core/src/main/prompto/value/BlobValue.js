import BinaryValue from './BinaryValue.js'
import { BlobType } from '../type/index.js'

export default class BlobValue extends BinaryValue {

    constructor(mimeType, data) {
        super(BlobType.instance, mimeType, data);
    }
}
