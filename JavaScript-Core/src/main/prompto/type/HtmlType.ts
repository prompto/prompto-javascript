import NativeType from './NativeType'
import { JsxType } from './index'
import { Identifier } from '../grammar'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";

export default class HtmlType extends NativeType {

    static instance = new HtmlType();

    constructor() {
        super(new Identifier("Html"), TypeFamily.HTML);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
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

