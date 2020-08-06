const RangeValue = require("./RangeValue").RangeValue;
const IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
let CharacterValue = null;
let CharacterType = null;

exports.resolve = () => {
    CharacterValue = require("./CharacterValue").CharacterValue;
    CharacterType = require("../type/CharacterType").CharacterType;
}

class CharacterRange extends RangeValue {
    constructor(left, right) {
        super(CharacterType.instance, left, right);
        return this;
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

/*
@Override
public RangeValue<CharacterValue> newInstance(CharacterValue left, CharacterValue right) {
	return new CharacterRange(left, right);
}


*/

exports.CharacterRange = CharacterRange;