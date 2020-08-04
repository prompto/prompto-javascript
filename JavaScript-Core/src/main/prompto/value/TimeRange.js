var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
var RangeValue = require("./RangeValue").RangeValue;
var TimeValue = require("./TimeValue").TimeValue;
var LocalTime = require("../intrinsic/LocalTime").LocalTime;
var TimeType = null;

exports.resolve = function() {
    TimeType = require("../type/TimeType").TimeType;
};

class TimeRange extends RangeValue {
    constructor(left, right) {
        super(TimeType.instance, left, right);
        return this;
    }

    size() {
        return 1 + (this.high.value.valueOf() - this.low.value.valueOf())/1000;
    }

    compare(o1, o2) {
        return o1.cmp(o2);
    }

    getItem(index) {
        var result = this.low.value.valueOf() + (index-1)*1000;
        if(result>this.high.value.valueOf()) {
            throw new IndexOutOfRangeError();
        }
        return new TimeValue(new LocalTime(result));
    }
}

/*
@Override
public RangeValue<TimeValue> newInstance(TimeValue left, TimeValue right) {
	return new TimeRange(left, right);
}
*/

exports.TimeRange = TimeRange;
