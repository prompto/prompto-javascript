import NativeType from '../../../main/prompto/type/NativeType.ts'
import { Identifier } from '../grammar'

export default class MissingType extends NativeType {

    constructor() {
        super(new Identifier("*"));
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        return true;
    }
}

MissingType.instance = new MissingType();
