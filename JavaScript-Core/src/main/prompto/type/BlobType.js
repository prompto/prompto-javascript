import BinaryType from './BinaryType.js'
import { Identifier } from '../grammar/index.js'

export default class BlobType extends BinaryType {

    constructor() {
        super(new Identifier("Blob"));
    }
}

BlobType.instance = new BlobType();
