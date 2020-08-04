var RangeValue = require("./RangeValue").RangeValue;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
var CharacterValue = null;
var CharacterType = null;

exports.resolve = function() {
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
        var result = this.low.value.charCodeAt(0) + index - 1;
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