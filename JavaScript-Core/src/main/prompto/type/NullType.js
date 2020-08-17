import BaseType from "./BaseType"
import { Identifier } from "../grammar/index"

export default class NullType extends BaseType {

    constructor() {
        super(new Identifier("Null"));
    }

    checkUnique(context) {
        // ok
    }

    checkExists(context) {
        // ok
    }

    isAssignableFrom(context, other) {
        return true;
    }

    isMoreSpecificThan(context, other) {
        return false;
    }

    equals(other) {
        return other==this;
    }
}

NullType.instance = new NullType();

