var Value = require("./Value").Value;
var PeriodValue = require("./PeriodValue").PeriodValue;
var DateValue = require("./DateValue").DateValue;
var TimeValue = require("./TimeValue").TimeValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var TextValue = require("./TextValue").TextValue;
var DateTimeType = null;

exports.resolve = function() {
    DateTimeType = require("../type/DateTimeType").DateTimeType;
};

function DateTimeValue(value) {
	Value.call(this, DateTimeType.instance);
	this.value = value;
	return this;
}

DateTimeValue.prototype = Object.create(Value.prototype);
DateTimeValue.prototype.constructor = DateTimeValue;

DateTimeValue.prototype.getStorableData = function() {
    return this.value;
};


DateTimeValue.prototype.toString = function() {
    return this.value.toString();
};

DateTimeValue.prototype.Add = function(context, value) {
	if (value instanceof PeriodValue) {
        var result = this.value.addPeriod(value.value);
        return new DateTimeValue(result);
	} else {
		throw new SyntaxError("Illegal: DateTimeValue + " + typeof(value));
	}
};


DateTimeValue.prototype.Subtract = function(context, value) {
	if (value instanceof DateTimeValue) {
		return this.subDateTime(value)
	} else if (value instanceof DateValue) {
		return this.subDate(value)
	} else if (value instanceof TimeValue) {
		return this.subTime(value)
	} else if (value instanceof PeriodValue) {
		return this.subPeriod(value)
	} else {
		throw new SyntaxError("Illegal: DateTimeValue - " + typeof(value));
	}
};

DateTimeValue.prototype.subDateTime = function(other) {
    var thisValue = this.date.valueOf() + this.tzOffset*1000;
    var otherValue = other.date.valueOf() + other.tzOffset*1000;
	var numDays = ( thisValue - otherValue)/(24*60*60*1000);
	var data = [];
	data[3] = Math.floor(numDays);
	data[4] = this.date.getUTCHours() - other.date.getUTCHours();
	data[5] = this.date.getUTCMinutes() - other.date.getUTCMinutes();
	data[6] = this.date.getUTCSeconds() - other.date.getUTCSeconds();
	data[7] = this.date.getUTCMilliseconds() - other.date.getUTCMilliseconds();
	return new PeriodValue(data);
}

DateTimeValue.prototype.subDate = function(value) {
	var numDays = (this.date.valueOf() - value.value.valueOf())/(24*60*60*1000);
	var data = [];
	data[3] = Math.floor(numDays);
	data[4] = this.date.getUTCHours();
	data[5] = this.date.getUTCMinutes();
	data[6] = this.date.getUTCSeconds();
	data[7] = this.date.getUTCMilliseconds();
	return new PeriodValue(data);
}

DateTimeValue.prototype.subTime = function(value) {
	var data = [];
	data[0] = this.date.getUTCFullYear();
	data[1] = this.date.getUTCMonth();
	data[3] = this.date.getUTCDate();
	data[4] = this.date.getUTCHours() - value.value.getUTCHours();
	data[5] = this.date.getUTCMinutes() - value.value.getUTCMinutes();
	data[6] = this.date.getUTCSeconds() - value.value.getUTCSeconds();
	data[7] = this.date.getUTCMilliseconds() - value.value.getUTCMilliseconds();
	return new PeriodValue(data);
}

DateTimeValue.prototype.subPeriod = function(value) {
	var date = new Date();
	var year = this.date.getUTCFullYear() - (value.years || 0);
	date.setUTCFullYear(year);
	var month = this.date.getUTCMonth() - (value.months || 0);
	date.setUTCMonth(month);
	var day = this.date.getUTCDate() - ((value.weeks || 0) * 7) - (value.days || 0);
	date.setUTCDate(day);
	var hour = this.date.getUTCHours() - (value.hours || 0);
	date.setUTCHours(hour);
	var minute = this.date.getUTCMinutes() - (value.minutes || 0);
	date.setUTCMinutes(minute);
	var second = this.date.getUTCSeconds() - (value.seconds || 0);
	date.setUTCSeconds(second);
	var millis = this.date.getUTCMilliseconds() - (value.millis || 0);
	date.setUTCMilliseconds(millis);
	return new DateTimeValue(date, this.tzOffset);
};

DateTimeValue.prototype.CompareTo = function(context, value) {
    if (value instanceof DateTimeValue) {
        return this.cmp(value.date, value.tzOffset);
    } else if (value instanceof DateValue) {
		return this.cmp(value.value, 0);
	} else {
		throw new SyntaxError("Illegal comparison: DateTimeValue and " + typeof(value));
	}
};

DateTimeValue.prototype.cmp = function(date, tzOffset) {
	var a = this.date.valueOf() + this.tzOffset*60000;
	var b = date.valueOf() + tzOffset*60000;
	return a > b ? 1 : (a == b ? 0 : -1);
};


DateTimeValue.prototype.getMemberValue = function(context, name) {
	if ("year"==name) {
		return new IntegerValue(this.date.getUTCFullYear());
	} else if ("month"==name) {
		return new IntegerValue(this.date.getUTCMonth() + 1);
	} else if ("dayOfMonth"==name) {
		return new IntegerValue(this.date.getUTCDate());
	} else if ("dayOfYear"==name) {
		return new IntegerValue(this.getDayOfYear());
	} else if ("hour"==name) {
		return new IntegerValue(this.date.getUTCHours());
	} else if ("minute"==name) {
		return new IntegerValue(this.date.getUTCMinutes());
	} else if ("second"==name) {
		return new IntegerValue(this.date.getUTCSeconds());
	} else if ("millisecond"==name) {
		return new IntegerValue(this.date.getUTCMilliseconds());
	} else if ("tzOffset"==name) {
		return new IntegerValue(this.tzOffset);
	} else if ("tzName"==name) {
		return new TextValue("Z");
	} else {
        return Value.prototype.getMemberValue.call(this, context, name);
	}
};

DateTimeValue.prototype.getDayOfYear = function() {
	var first = new Date(this.date);
	first.setMonth(0);
	first.setDate(1);
	var numDays = (this.date - first) / (1000 * 60 * 60 * 24);
	return 1 + Math.floor(numDays);
}


DateTimeValue.prototype.equals = function(obj) {
	if (obj instanceof DateTimeValue) {
		return this.date.valueOf() == obj.date.valueOf() && this.tzOffset==obj.tzOffset;
	} else {
		return false;
	}
};

exports.DateTimeValue = DateTimeValue;
