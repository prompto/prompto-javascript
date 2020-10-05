import RangeValue from './RangeValue.js'
import { CharacterValue } from './index.js'
import { IndexOutOfRangeError } from '../error/index.js'
import { CharacterType } from '../type/index.js'

export default class CharacterRangeValue extends RangeValue {

    constructor(left, right) {
        super(CharacterType.instance, left, right);
    }

    size() {
        return 1 + this.high.value.charCodeAt(0) - this.low.value.charCodeAt(0);
    }

    getItem(index) {
        const result = this.low.value.charCodeAt(0) + index - 1;
        if(result>this.high.value.charCodeAt(0)) {
            throw new IndexOutOfRangeError();
        } else {
            return new CharacterValue(String.fromCharCode(result));
        }
    }
}
