var RangeValue = require("./RangeValue").RangeValue;
var TimeValue = require("./TimeValue").TimeValue;
var LocalTime = require("../intrinsic/LocalTime").LocalTime;
var TimeType = null;

exports.resolve = function() {
    TimeType = require("../type/TimeType").TimeType;
};

function TimeRange(left, right) {
	RangeValue.call(this, TimeType.instance, left, right);
	return this;
}

TimeRange.prototype = Object.create(RangeValue.prototype);
TimeRange.prototype.constructor = TimeRange;


TimeRange.prototype.size = function() {
	return 1 + (this.high.value.valueOf() - this.low.value.valueOf())/1000;
};

TimeRange.prototype.compare = function(o1, o2) {
	return o1.cmp(o2);
};

TimeRange.prototype.getItem = function(index) {
	var result = this.low.value.valueOf() + (index-1)*1000;
	if(result>this.high.value.valueOf()) {
		throw new IndexOutOfBoundsException();
	}
	return new TimeValue(new LocalTime(result));
};

/*
@Override
public RangeValue<TimeValue> newInstance(TimeValue left, TimeValue right) {
	return new TimeRange(left, right);
}
*/

exports.TimeRange = TimeRange;
