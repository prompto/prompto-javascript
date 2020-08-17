import NativeType from "./NativeType"
import { Identifier } from "../grammar/index"

export default class MissingType extends NativeType {

    constructor() {
        super(new Identifier("*"));
    }

    isAssignableFrom(context, other) {
        return true;
    }
}

MissingType.instance = new MissingType();
