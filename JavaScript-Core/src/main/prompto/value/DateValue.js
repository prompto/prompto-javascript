var Value = require("./Value").Value;
var PeriodValue = require("./PeriodValue").PeriodValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var LocalDate = require("../intrinsic/LocalDate").LocalDate;
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
    return this.value.toString();
};

DateValue.prototype.getValue = function() {
	return this.value; 
};

DateValue.prototype.Add = function(context, value) {
    if (value instanceof PeriodValue) {
        var date = this.value.addPeriod(value.value);
        return new DateValue(date);
    } else {
        throw new SyntaxError("Illegal: Date + " + typeof(value));
    }
};


DateValue.prototype.Subtract = function(context, value)  {
    if (value instanceof DateValue) {
        return this.value.subtractDate(value.value);
    } else if (value instanceof PeriodValue) {
        return this.value.subtractPeriod(value.value);
    } else {
        throw new SyntaxError("Illegal: Date - " + typeof(value));
    }
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
        return new IntegerValue(this.value.getUTCFullYear());
    } else if ("month"==name) {
        return new IntegerValue(this.value.getUTCMonth() + 1);
    } else if ("dayOfMonth"==name) {
        return new IntegerValue(this.value.getUTCDate());
    } else if ("dayOfYear"==name) {
        return new IntegerValue(this.getDayOfYear());
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


