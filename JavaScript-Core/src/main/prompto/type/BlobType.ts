import BinaryType from './BinaryType'
import { Identifier } from '../grammar'
import {TypeFamily} from "../store";

export default class BlobType extends BinaryType {

    static instance = new BlobType();

    constructor() {
        super(new Identifier("Blob"), TypeFamily.BLOB);
    }
}
