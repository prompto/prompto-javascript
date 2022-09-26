import NativeType from './NativeType.ts'
import { JsxType } from './index.ts'
import { Identifier } from '../grammar'

export default class HtmlType extends NativeType {

    constructor() {
        super(new Identifier("Html"));
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        if(other===JsxType.instance)
            return true;
        else
            return super.isAssignableFrom(context, other);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('Html');
    }
}


HtmlType.instance = new HtmlType();
