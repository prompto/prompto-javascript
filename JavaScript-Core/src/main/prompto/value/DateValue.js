var Value = require("./Value").Value;
var DateTimeValue = require("./DateTimeValue").DateTimeValue;
var PeriodValue = require("./PeriodValue").PeriodValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var TextValue = require("./TextValue").TextValue;
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


DateValue.prototype.convertToJavaScript = function() {
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


DateValue.prototype.compareToValue = function(context, value) {
    if (value instanceof DateValue || value instanceof DateTimeValue) {
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
        return new IntegerValue(this.value.getYear());
    } else if ("month"==name) {
        return new IntegerValue(this.value.getMonth());
    } else if ("dayOfMonth"==name) {
        return new IntegerValue(this.value.getUTCDate());
    } else if ("dayOfYear"==name) {
        return new IntegerValue(this.value.getDayOfYear());
    } else {
        return Value.prototype.getMemberValue.call(this, context, name);
    }
};


DateValue.prototype.equals = function(obj) {
    if (obj instanceof DateValue) {
        return this.value.equals(obj.value);
    } else {
        return false;
    }
};



DateValue.prototype.toDocumentValue = function(context) {
    return new TextValue(this.toString());
};

exports.DateValue = DateValue;


