var Value = require("./Value").Value;
var PeriodValue = require("./PeriodValue").PeriodValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
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

TimeValue.Parse = function(text) {
	var date = new Date();
	date.setUTCHours(parseInt(text.substring(0,2)));
	date.setUTCMinutes(parseInt(text.substring(3,5)));
	date.setUTCSeconds(parseInt(text.length>6 ? text.substring(6,8) : 0));
	date.setUTCMilliseconds(text.length>9 ? parseInt(text.substring(9,13)) : 0);
	return new TimeValue(date);
};

TimeValue.prototype.toString = function() {
    return this.value.toISOString().substring(11, 23);
};

TimeValue.prototype.getValue = function() {
	return this.value;
};

TimeValue.prototype.Add = function(context, value) {
	if (value instanceof PeriodValue) {
		return this.addPeriod(value);
	} else {
		throw new SyntaxError("Illegal: TimeValue + " + typeof(value));
	}
};

TimeValue.prototype.addPeriod = function(value) {
	var date = new Date();
	var hour = this.value.getUTCHours() + (value.hours || 0);
	date.setUTCHours(hour);
	var minute = this.value.getUTCMinutes() + (value.minutes || 0);
	date.setUTCMinutes(minute);
	var second = this.value.getUTCSeconds() + (value.seconds || 0);
	date.setUTCSeconds(second);
	var millis = this.value.getUTCMilliseconds() + (value.millis || 0);
	date.setUTCMilliseconds(millis);
	return new TimeValue(date);
};

TimeValue.prototype.Subtract = function(context, value) {
	if (value instanceof PeriodValue) {
		return this.subPeriod(value);
	} else if (value instanceof TimeValue) {
			return this.subTime(value);
	} else {
		throw new SyntaxError("Illegal: TimeValue - " + typeof(value));
	}
};

TimeValue.prototype.subTime = function(value) {
	var data = [];
	data[4] = this.value.getUTCHours() - value.value.getUTCHours();
	data[5] = this.value.getUTCMinutes() - value.value.getUTCMinutes();
	data[6] = this.value.getUTCSeconds() - value.value.getUTCSeconds();
	data[7] = this.value.getUTCMilliseconds() - value.value.getUTCMilliseconds();
	return new PeriodValue(data);
};

TimeValue.prototype.subPeriod = function(value) {
	var date = new Date();
	var hour = this.value.getUTCHours() - (value.hours || 0);
	date.setUTCHours(hour);
	var minute = this.value.getUTCMinutes() - (value.minutes || 0);
	date.setUTCMinutes(minute);
	var second = this.value.getUTCSeconds() - (value.seconds || 0);
	date.setUTCSeconds(second);
	var millis = this.value.getUTCMilliseconds() - (value.millis || 0);
	date.setUTCMilliseconds(millis);
	return new TimeValue(date);
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
		return new IntegerValue(this.value.getUTCHours());
	} else if ("minute"==name) {
		return new IntegerValue(this.value.getUTCMinutes());
	} else if ("second"==name) {
		return new IntegerValue(this.value.getUTCSeconds());
	} else if ("millisecond"==name) {
		return new IntegerValue(this.value.getUTCMilliseconds());
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
