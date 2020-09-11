import NativeType from "./NativeType"
import { Identifier } from "../grammar/index"

export default class VoidType extends NativeType {

    constructor() {
        super(new Identifier("Void"));
    }

    isAssignableFrom(context, other) {
        // illegal, but happens during syntax checking, if error is collected rather than thrown
        return false;
    }
}

VoidType.instance = new VoidType();


