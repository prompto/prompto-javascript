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
		return new PeriodValue(this.value.subtractDateTime(value.value));
	} /* else if (value instanceof DateValue) {
		return new PeriodValue(this.value.subtractDate(value.value));
	} else if (value instanceof TimeValue) {
		return new PeriodValue(this.value.subtractTime(value.value));
	} */ else if (value instanceof PeriodValue) {
		return new DateTimeValue(this.value.subtractPeriod(value.value));
	} else {
		throw new SyntaxError("Illegal: DateTimeValue - " + typeof(value));
	}
};

DateTimeValue.prototype.CompareTo = function(context, value) {
    if (value instanceof DateTimeValue) {
        return this.value.compareTo(value.value.date, value.value.tzOffset);
    } else if (value instanceof DateValue) {
        return this.value.compareTo(value.value.date, 0);
    } else {
        throw new SyntaxError("Illegal comparison: DateTimeValue and " + typeof(value));
    }
};


DateTimeValue.prototype.getMemberValue = function(context, name) {
    try {
        var value = this.value.getMember(name);
        if(typeof(value) === typeof(0))
            return new IntegerValue(value);
        else if(typeof(value) === typeof("z"))
            return new TextValue(value);
    } catch (error) {
        // don't do anything
    }
    return Value.prototype.getMemberValue.call(this, context, name);
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
		return this.value.equals(obj.value);
	} else {
		return false;
	}
};

exports.DateTimeValue = DateTimeValue;
