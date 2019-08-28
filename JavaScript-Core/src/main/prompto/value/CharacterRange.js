var RangeValue = require("./RangeValue").RangeValue;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
var CharacterValue = null;
var CharacterType = null;

exports.resolve = function() {
    CharacterValue = require("./CharacterValue").CharacterValue;
    CharacterType = require("../type/CharacterType").CharacterType;
}

function CharacterRange(left, right) {
	RangeValue.call(this, CharacterType.instance, left, right);
	return this;
}

CharacterRange.prototype = Object.create(RangeValue.prototype);
CharacterRange.prototype.constructor = CharacterRange;


CharacterRange.prototype.size = function() {
	return 1 + this.high.value.charCodeAt(0) - this.low.value.charCodeAt(0);
};


CharacterRange.prototype.getItem = function(index) {
	var result = this.low.value.charCodeAt(0) + index - 1;
	if(result>this.high.value.charCodeAt(0)) {
		throw new IndexOutOfRangeError();
	} else {
		return new CharacterValue(String.fromCharCode(result));
	}
};

/*
@Override
public RangeValue<CharacterValue> newInstance(CharacterValue left, CharacterValue right) {
	return new CharacterRange(left, right);
}


*/

exports.CharacterRange = CharacterRange;