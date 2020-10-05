import Value from './Value.js'
import { AnyType } from '../type/index.js'

export default class AnyValue extends Value {

    constructor() {
        super(AnyType.instance);
        this.text = null;
    }

    toString() {
        return "{id:" + this.id + ", text:" + this.text + "}";
    }
}


