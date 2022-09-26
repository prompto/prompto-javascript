import BaseType from './BaseType.ts'
import { Identifier } from '../grammar'

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

    isAssignableFrom(context: Context, other: Type): boolean {
        return true;
    }

    isMoreSpecificThan(context, other) {
        return false;
    }

    equals(other) {
        return other===this;
    }
}

NullType.instance = new NullType();

