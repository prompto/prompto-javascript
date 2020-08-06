const Value = require("./Value").Value;
const TimeValue = require("./TimeValue").TimeValue;
const DateTimeValue = require("./DateTimeValue").DateTimeValue;
const PeriodValue = require("./PeriodValue").PeriodValue;
const IntegerValue = require("./IntegerValue").IntegerValue;
const TextValue = require("./TextValue").TextValue;
let DateType = null;

exports.resolve = () => {
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
        const a = this.value.valueOf();
        const b = value.value.valueOf();
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


