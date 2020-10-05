import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'

export default class JsxType extends NativeType {

    constructor() {
        super(new Identifier("Jsx"));
    }
}


JsxType.instance = new JsxType();
