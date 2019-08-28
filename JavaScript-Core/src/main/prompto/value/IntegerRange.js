var RangeValue = require("./RangeValue").RangeValue;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
var IntegerValue = require("./IntegerValue").IntegerValue;
var IntegerType = null;

exports.resolve =function() {
    IntegerType = require("../type/IntegerType").IntegerType;
};

function IntegerRange(left, right) {
	RangeValue.call(this, IntegerType.instance, left, right);
	return this;
}

IntegerRange.prototype = Object.create(RangeValue.prototype);
IntegerRange.prototype.constructor = IntegerRange;

IntegerRange.prototype.size = function() {
	return 1 + this.high.IntegerValue() - this.low.IntegerValue();
};


IntegerRange.prototype.getItem = function(index) {
	var result = this.low.IntegerValue() + index - 1;
	if(result>this.high.IntegerValue()) {
		throw new IndexOutOfRangeError();
	}
	return new IntegerValue(result);
};

IntegerRange.prototype.newInstance = function(left, right) {
	return new IntegerRange(left, right);
};


exports.IntegerRange = IntegerRange;