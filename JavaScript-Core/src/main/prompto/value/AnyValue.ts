import BaseValue from './BaseValue'
import { AnyType } from '../type'

export default class AnyValue extends BaseValue<any> {

    constructor() {
        super(AnyType.instance, null);
    }

    toString() {
        return "{id:" + String(this.id) + "}"; // ", text:" + this.text + "}";
    }
}


