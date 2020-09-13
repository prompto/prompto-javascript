import Value from "./Value"

export default class BinaryValue extends Value {

    constructor(itype, mimeType, data) {
        super(itype);
        this.mimeType = mimeType;
        this.data = data;
    }
}
