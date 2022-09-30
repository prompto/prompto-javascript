import NativeType from './NativeType'
import { Identifier } from '../grammar'
import {Context} from "../runtime";
import {Type} from "../intrinsic";
import {TypeFamily} from "../store";

export default class VoidType extends NativeType {

    static instance = new VoidType();

    constructor() {
        super(new Identifier("Void"), TypeFamily.VOID);
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        // illegal, but happens during syntax checking, if error is collected rather than thrown
        return false;
    }
}


