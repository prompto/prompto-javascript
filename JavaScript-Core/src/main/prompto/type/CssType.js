import NativeType from "./NativeType"
import { Identifier } from "../grammar/index"

export default class CssType extends NativeType {

    constructor() {
        super(new Identifier("Css"));
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append("Object");
    }
}

CssType.instance = new CssType();
