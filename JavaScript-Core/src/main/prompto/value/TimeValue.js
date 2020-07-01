var Value = require("./Value").Value;
var PeriodValue = require("./PeriodValue").PeriodValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var TextValue = require("./TextValue").TextValue;
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


TimeValue.prototype.getStorableData = function() {
	return this.value;
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

TimeValue.prototype.compareToValue = function(context, value) {
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

TimeValue.prototype.cmp = function(obj) {
	var a = this.value.valueOf();
	var b = obj.value.valueOf();
	return a > b ? 1 : (a == b ? 0 : -1) ;
};

TimeValue.prototype.equals = function(obj) {
	if (obj instanceof TimeValue) {
		return this.value.equals(obj.value);
	} else {
		return false;
	}
};


TimeValue.prototype.toDocumentValue = function(context) {
	return new TextValue(this.toString());
};

exports.TimeValue = TimeValue;
