import NativeType from '../../../main/prompto/type/NativeType.ts'
import { Identifier } from '../grammar'

export default class MissingType extends NativeType {

    constructor() {
        super(new Identifier("*"));
    }

    isAssignableFrom(context, other) {
        return true;
    }
}

MissingType.instance = new MissingType();
