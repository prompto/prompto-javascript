var Value = require("./Value").Value;
var TimeValue = require("./TimeValue").TimeValue;
var DateTimeValue = require("./DateTimeValue").DateTimeValue;
var PeriodValue = require("./PeriodValue").PeriodValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var TextValue = require("./TextValue").TextValue;
var DateType = null;

exports.resolve = function() {
    DateType = require("../type/DateType").DateType;
};

class DateValue extends Value {
  
    constructor(value) {
        super(DateType.instance);
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    getStorableData() {
        return this.value;
    }

    getValue() {
        return this.value; 
    }

    convertToJavaScript() {
        return this.value;
    }

    Add(context, value) {
        if (value instanceof PeriodValue) {
            return new DateValue(this.value.addPeriod(value.value));
        } if (value instanceof TimeValue) {
            return new DateTimeValue(this.value.addTime(value.value));
        } else {
            throw new SyntaxError("Illegal: Date + " + typeof(value));
        }
    }

    Subtract(context, value) {
        if (value instanceof DateValue) {
            return new PeriodValue(this.value.subtractDate(value.value));
        } else if (value instanceof PeriodValue) {
            return new DateValue(this.value.subtractPeriod(value.value));
        } else {
            throw new SyntaxError("Illegal: Date - " + typeof(value));
        }
    }

    compareToValue(context, value) {
        if (value instanceof DateValue || value instanceof DateTimeValue) {
            return this.cmp(value);
        } else {
            throw new SyntaxError("Illegal comparison: Date and " + typeof(value));
        }
    }

    cmp(value) {
        var a = this.value.valueOf();
        var b = value.value.valueOf();
        return a > b ? 1 : (a == b ? 0 : -1);
    }

    getMemberValue(context, name) {
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
    }

    equals(obj) {
        if (obj instanceof DateValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    toDocumentValue(context) {
        return new TextValue(this.toString());
    }
}

exports.DateValue = DateValue;


