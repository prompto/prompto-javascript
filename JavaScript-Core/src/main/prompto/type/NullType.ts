import BaseType from './BaseType'
import { Identifier } from '../grammar'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";

export default class NullType extends BaseType {

    static instance = new NullType();

    constructor() {
        super(new Identifier("Null"), TypeFamily.NULL);
    }

    checkExists(context: Context) {
        // ok
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return true;
    }

    isMoreSpecificThan(context: Context, other: IType) {
        return false;
    }

    equals(other: any) {
        return other == this;
    }

    declare(transpiler: Transpiler) {
        // nothing to do
    }

    transpile(transpiler: Transpiler) {
        // nothing to do
    }


}

