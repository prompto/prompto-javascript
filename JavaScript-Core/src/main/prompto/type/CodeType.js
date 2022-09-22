import NativeType from './NativeType.ts'
import { Identifier } from '../grammar'

export default class CodeType extends NativeType {

    constructor() {
        super(new Identifier("Code"));
    }
}

CodeType.instance = new CodeType();


