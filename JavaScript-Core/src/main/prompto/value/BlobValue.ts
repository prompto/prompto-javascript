import BinaryValue from '../../../main/prompto/value/BinaryValue'
import { BlobType } from '../type'

export default class BlobValue extends BinaryValue {

    constructor(mimeType, data) {
        super(BlobType.instance, mimeType, data);
    }
}
