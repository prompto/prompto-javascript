var Value = require("./Value").Value;
var PeriodValue = require("./PeriodValue").PeriodValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var LocalTime = require("../intrinsic/LocalTime").LocalTime;
var TimeType = null;

exports.resolve = function() {
    TimeType = require("../type/TimeType").TimeType;
};

function TimeValue(value) {
	Value.call(this, TimeType.instance);
	this.value = value;
	return this;
}

TimeValue.prototype = Object.create(Value.prototype);
TimeValue.prototype.constructor = TimeValue;

TimeValue.prototype.toString = function() {
    return this.value.toString();
};

TimeValue.prototype.getValue = function() {
	return this.value;
};

TimeValue.prototype.Add = function(context, value) {
	if (value instanceof PeriodValue) {
		return new TimeValue(this.value.addPeriod(value));
	} else {
		throw new SyntaxError("Illegal: TimeValue + " + typeof(value));
	}
};


TimeValue.prototype.Subtract = function(context, value) {
	if (value instanceof PeriodValue) {
		return new TimeValue(this.value.subtractPeriod(value.value));
	} else if (value instanceof TimeValue) {
        return new PeriodValue(this.value.subtractTime(value.value));
	} else {
		throw new SyntaxError("Illegal: TimeValue - " + typeof(value));
	}
};


/*
@Override
public IValue Subtract(Context context, IValue value) throws PromptoError {
	if (value instanceof TimeValue) {
		LocalTime other = ((TimeValue) value).value;
		org.joda.time.PeriodValue res = new org.joda.time.PeriodValue(0, 0, 0, 0, this.value.getHourOfDay() - other.getHourOfDay(), this.value.getMinuteOfHour() - other.getMinuteOfHour(), this.value.getSecondOfMinute() - other.getSecondOfMinute(), this.value.getMillisOfSecond()
				- other.getMillisOfSecond());
		return new PeriodValue(res);
	} else if (value instanceof PeriodValue)
		return this.minus((PeriodValue) value);
	else
		throw new SyntaxError("Illegal: TimeValue - " + value.getClass().getSimpleName());
}

*/

TimeValue.prototype.CompareTo = function(context, value) {
	if (value instanceof TimeValue) {
		return this.cmp(value);
	} else {
		throw new SyntaxError("Illegal comparison: TimeValue and " + typeof(value));
	}
};

TimeValue.prototype.getMemberValue = function(context, name) {
	if ("hour"==name) {
		return new IntegerValue(this.value.getHour());
	} else if ("minute"==name) {
		return new IntegerValue(this.value.getMinute());
	} else if ("second"==name) {
		return new IntegerValue(this.value.getSecond());
	} else if ("millisecond"==name) {
		return new IntegerValue(this.value.getMillisecond());
	} else {
        return Value.prototype.getMemberValue.call(this, context, name);
	}
};

/*
@Override
public Object ConvertTo(Class<?> type) {
	return value;
}

public long getMillisOfDay() {
	return value.getMillisOfDay();
}

*/

TimeValue.prototype.cmp = function(obj) {
	var a = this.value.valueOf();
	var b = obj.value.valueOf();
	return a > b ? 1 : (a == b ? 0 : -1) ;
};

TimeValue.prototype.equals = function(obj) {
	if (obj instanceof TimeValue) {
		return this.value.valueOf() == obj.value.valueOf();
	} else {
		return false;
	}
};

/*
@Override
public int hashCode() {
	return value.hashCode();
}

@Override
public String toString() {
	return value.toString();
}

*/

exports.TimeValue = TimeValue;
