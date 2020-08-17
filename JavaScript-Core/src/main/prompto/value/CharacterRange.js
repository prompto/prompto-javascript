
export default class CharacterRange extends RangeValue {

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
