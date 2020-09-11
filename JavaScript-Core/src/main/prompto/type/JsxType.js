import NativeType from "./NativeType"
import { Identifier } from "../grammar/index"

export default class JsxType extends NativeType {

    constructor() {
        super(new Identifier("Jsx"));
    }
}


JsxType.instance = new JsxType();
