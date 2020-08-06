const IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
const RangeValue = require("./RangeValue").RangeValue;
const TimeValue = require("./TimeValue").TimeValue;
const LocalTime = require("../intrinsic/LocalTime").LocalTime;
let TimeType = null;

exports.resolve = () => {
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
        const result = this.low.value.valueOf() + (index-1)*1000;
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
