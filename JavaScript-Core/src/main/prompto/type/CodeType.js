import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'

export default class CodeType extends NativeType {

    constructor() {
        super(new Identifier("Code"));
    }
}

CodeType.instance = new CodeType();


