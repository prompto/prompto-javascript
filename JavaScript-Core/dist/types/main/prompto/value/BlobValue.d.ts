import BinaryValue from './BinaryValue';
export default class BlobValue extends BinaryValue {
    constructor(mimeType: string, data: ArrayBuffer);
}
