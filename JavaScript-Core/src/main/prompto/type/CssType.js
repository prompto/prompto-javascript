import NativeType from './NativeType.js';
import { Identifier } from '../grammar/index.js';
import { Any } from "../intrinsic/index.js";

export default class CssType extends NativeType {

    constructor() {
        super(new Identifier("Css"));
    }

    checkAdd(context, other, tryReverse) {
        if (other === CssType.instance) {
            return this;
        } else {
            return super.checkAdd(context, other, tryReverse);
        }
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append("Object");
    }


    declareAdd(transpiler) {
        transpiler.require(Any);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === CssType.instance) {
            transpiler.append("Object.assign(new Any(),");
            left.transpile(transpiler);
            transpiler.append(",");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

}

CssType.instance = new CssType();
