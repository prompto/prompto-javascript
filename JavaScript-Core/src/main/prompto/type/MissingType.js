import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'

export default class MissingType extends NativeType {

    constructor() {
        super(new Identifier("*"));
    }

    isAssignableFrom(context, other) {
        return true;
    }
}

MissingType.instance = new MissingType();
