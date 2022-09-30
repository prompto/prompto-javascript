import NativeType from './NativeType';
import { Identifier } from '../grammar';
import { Any } from "../intrinsic";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {TypeFamily} from "../store";
import IType from "./IType";
import {IExpression} from "../expression";

export default class CssType extends NativeType {

    static instance = new CssType();
    
    constructor() {
        super(new Identifier("Css"), TypeFamily.CSS);
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if (other === CssType.instance) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("Object");
    }


    declareAdd(transpiler: Transpiler) {
        transpiler.require(Any);
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
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

