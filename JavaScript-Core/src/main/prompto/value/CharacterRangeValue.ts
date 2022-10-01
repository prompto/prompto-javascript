import RangeValue from './RangeValue'
import { CharacterValue } from '../value'
import { IndexOutOfRangeError } from '../error'
import { CharacterType } from '../type'
import {Context} from "../runtime";
import IValue from "./IValue";

export default class CharacterRangeValue extends RangeValue<CharacterValue> {

    constructor(left: CharacterValue, right: CharacterValue) {
        super(CharacterType.instance, left, right);
    }

    size() {
        return 1 + this.high.value.charCodeAt(0) - this.low.value.charCodeAt(0);
    }

    hasItem(context: Context, value: IValue): boolean {
        if(value instanceof CharacterValue) {
            const charCode = value.value.charCodeAt(0);
            return charCode >= this.low.value.charCodeAt(0) && charCode <= this.high.value.charCodeAt(0);
        } else
            return false;
    }

    getItem(index: number) {
        const result = this.low.value.charCodeAt(0) + index - 1;
        if(result>this.high.value.charCodeAt(0)) {
            throw new IndexOutOfRangeError();
        } else {
            return new CharacterValue(String.fromCharCode(result));
        }
    }

    newInstance(first: CharacterValue, last: CharacterValue): RangeValue<CharacterValue> {
        return new CharacterRangeValue(first, last);
    }
}
