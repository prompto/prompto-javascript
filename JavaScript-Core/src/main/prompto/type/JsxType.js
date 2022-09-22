import NativeType from '../../../main/prompto/type/NativeType.ts'
import { Identifier } from '../grammar'

export default class JsxType extends NativeType {

    constructor() {
        super(new Identifier("Jsx"));
    }
}


JsxType.instance = new JsxType();
