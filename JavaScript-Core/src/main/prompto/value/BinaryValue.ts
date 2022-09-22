import BaseValue from './BaseValue'

export default class BinaryValue extends BaseValue<null> {

    mimeType: string;
    data: Uint8Array;

    constructor(itype, mimeType, data) {
        super(itype);
        this.mimeType = mimeType;
        this.data = data;
    }
}
