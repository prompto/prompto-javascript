import NativeType from './NativeType'
import { Identifier } from '../grammar'
import {Context} from "../runtime";
import {TypeFamily} from "../store";
import IType from "./IType";

export default class VoidType extends NativeType {

    static instance = new VoidType();

    constructor() {
        super(new Identifier("Void"), TypeFamily.VOID);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        // illegal, but happens during syntax checking, if error is collected rather than thrown
        return false;
    }
}


