import NativeType from './NativeType.ts'
import { Identifier } from '../grammar'

export default class VoidType extends NativeType {

    constructor() {
        super(new Identifier("Void"));
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        // illegal, but happens during syntax checking, if error is collected rather than thrown
        return false;
    }
}

VoidType.instance = new VoidType();


