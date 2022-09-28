import NativeType from './NativeType'
import { Identifier } from '../grammar'

export default class CodeType extends NativeType {

    static instance = new CodeType();

    constructor() {
        super(new Identifier("Code"));
    }

}



