import NativeType from './NativeType'
import { Identifier } from '../grammar'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import {Type} from "../intrinsic";

export default class DbIdType extends NativeType {

    static instance = new DbIdType();

    constructor() {
        super(new Identifier("DbId"), TypeFamily.ANY);
     }

    isAssignableFrom(context: Context, other: Type): boolean {
        return super.isAssignableFrom(context, other) || other instanceof NativeType;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('DbId');
    }

}


