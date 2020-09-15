import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'

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
