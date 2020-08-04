var RangeValue = require("./RangeValue").RangeValue;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
var IntegerValue = require("./IntegerValue").IntegerValue;
var IntegerType = null;

exports.resolve =function() {
    IntegerType = require("../type/IntegerType").IntegerType;
};

class IntegerRange extends RangeValue {
    constructor(left, right) {
        super(IntegerType.instance, left, right);
        return this;
    }

    size() {
        return 1 + this.high.IntegerValue() - this.low.IntegerValue();
    }

    getItem(index) {
        var result = this.low.IntegerValue() + index - 1;
        if(result>this.high.IntegerValue()) {
            throw new IndexOutOfRangeError();
        }
        return new IntegerValue(result);
    }

    newInstance(left, right) {
        return new IntegerRange(left, right);
    }
}


exports.IntegerRange = IntegerRange;