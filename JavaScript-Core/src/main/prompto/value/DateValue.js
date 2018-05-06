var Value = require("./Value").Value;
var Period = require("./Period").Period;
var Integer = require("./Integer").Integer;
var addPeriodToDate = require("../utils/Utils").addPeriodToDate;
var DateType = null;

exports.resolve = function() {
    DateType = require("../type/DateType").DateType;
};

function DateValue(value) {
    Value.call(this, DateType.instance);
	this.value = value;
	return this;
}

DateValue.prototype = Object.create(Value.prototype);
DateValue.prototype.constructor = DateValue;

DateValue.prototype.toString = function() {
    return this.value.toISOString().substring(0, 10);
};

DateValue.prototype.getValue = function() {
	return this.value; 
};

DateValue.prototype.Add = function(context, value) {
    if (value instanceof Period) {
        var date = addPeriodToDate(this.value, value);
        return new DateValue(date);
    } else {
        throw new SyntaxError("Illegal: Date + " + typeof(value));
    }
};


DateValue.prototype.Subtract = function(context, value)  {
    if (value instanceof DateValue) {
        return this.minusDate(value);
    } else if (value instanceof Period) {
        return this.minusPeriod(value);
    } else {
        throw new SyntaxError("Illegal: Date - " + typeof(value));
    }
};



DateValue.prototype.minusDate = function(value) {
    var data = [];
    data[0] = this.value.getUTCFullYear() - value.value.getUTCFullYear();
    data[1] = this.value.getUTCMonth() - value.value.getUTCMonth();
    data[3] = this.value.getUTCDate() - value.value.getUTCDate();
    return new Period(data);
};



DateValue.prototype.minusPeriod = function(value) {
    var date = new Date();
    var year = this.value.getUTCFullYear() - (value.years || 0);
    date.setUTCFullYear(year);
    var month = this.value.getUTCMonth() - (value.months || 0);
    date.setUTCMonth(month);
    var day = this.value.getUTCDate() - ((value.weeks || 0) * 7) - (value.days || 0);
    date.setUTCDate(day);
    return new DateValue(date);
};



DateValue.prototype.CompareTo = function(context, value) {
    if (value instanceof DateValue || value instanceof DateTime) {
        return this.cmp(value);
    } else {
        throw new SyntaxError("Illegal comparison: Date and " + typeof(value));
    }
};



DateValue.prototype.cmp = function(value) {
    var a = this.value.valueOf();
    var b = value.value.valueOf();
    return a > b ? 1 : (a == b ? 0 : -1);
};



DateValue.prototype.getMemberValue = function(context, name) {
    if ("year"==name) {
        return new Integer(this.value.getUTCFullYear());
    } else if ("month"==name) {
        return new Integer(this.value.getUTCMonth() + 1);
    } else if ("dayOfMonth"==name) {
        return new Integer(this.value.getUTCDate());
    } else if ("dayOfYear"==name) {
        return new Integer(this.getDayOfYear());
    } else {
        return Value.prototype.getMemberValue.call(this, context, name);
    }
};



DateValue.prototype.getDayOfYear = function() {
    var first = new Date(this.value);
    first.setMonth(0);
    first.setDate(1);
    var numDays = (this.value - first) / (1000 * 60 * 60 * 24);
    return 1 + Math.floor(numDays);
};



DateValue.prototype.equals = function(obj) {
    if (obj instanceof DateValue) {
        return this.value.valueOf() == obj.value.valueOf();
    } else {
        return false;
    }
};


exports.DateValue = DateValue;


