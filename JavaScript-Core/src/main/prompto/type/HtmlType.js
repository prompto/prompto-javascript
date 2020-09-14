import NativeType from "./NativeType"
import { JsxType } from "./index"
import { Identifier } from "../grammar/index"

export default class HtmlType extends NativeType {

    constructor() {
        super(new Identifier("Html"));
    }

    isAssignableFrom(context, other) {
        if(other===JsxType.instance)
            return true;
        else
            return super.isAssignableFrom(context, other);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append('Html');
    }
}


HtmlType.instance = new HtmlType();
