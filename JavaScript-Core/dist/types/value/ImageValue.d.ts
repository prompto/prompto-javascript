import BinaryValue from './BinaryValue';
export default class ImageValue extends BinaryValue {
    constructor(mimeType: string, data: Uint8Array);
}
