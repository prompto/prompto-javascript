import Value from '../../../main/prompto/value/Value.ts'
import { AnyType } from '../type'

export default class AnyValue extends BaseValue {

    constructor() {
        super(AnyType.instance);
        this.text = null;
    }

    toString() {
        return "{id:" + this.id + ", text:" + this.text + "}";
    }
}


