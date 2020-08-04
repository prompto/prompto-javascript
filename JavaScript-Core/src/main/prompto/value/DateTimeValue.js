var Value = require("./Value").Value;
var PeriodValue = require("./PeriodValue").PeriodValue;
var DateValue = null;
var TimeValue = require("./TimeValue").TimeValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var TextValue = require("./TextValue").TextValue;
var DateTimeType = null;

exports.resolve = function() {
    DateValue = require("./DateValue").DateValue;
    DateTimeType = require("../type/DateTimeType").DateTimeType;
};

class DateTimeValue extends Value {
  
    constructor(value) {
        super(DateTimeType.instance);
        this.value = value;
   }

    getStorableData() {
        return this.value;
    }

    convertToJavaScript() {
        return this.value;
    }

    toString() {
        return this.value.toString();
    }

    Add(context, value) {
        if (value instanceof PeriodValue) {
            var result = this.value.addPeriod(value.value);
            return new DateTimeValue(result);
        } else {
            throw new SyntaxError("Illegal: DateTimeValue + " + typeof(value));
        }
    }

    Subtract(context, value) {
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
    }

    compareToValue(context, value) {
        if (value instanceof DateTimeValue) {
            return this.value.compareTo(value.value.date, value.value.tzOffset);
        } else if (value instanceof DateValue) {
            return this.value.compareTo(value.value.date, 0);
        } else {
            throw new SyntaxError("Illegal comparison: DateTimeValue and " + typeof(value));
        }
    }

    getMemberValue(context, name) {
        try {
            var value = null;
            if ("year" == name) {
                value = this.value.getYear();
            } else if ("month" == name) {
                value = this.value.getMonth();
            } else if ("dayOfMonth" == name) {
                value = this.value.getDayOfMonth();
            } else if ("dayOfYear" == name) {
                value = this.value.getDayOfYear();
            } else if ("hour" == name) {
                value = this.value.getHour();
            } else if ("minute" == name) {
                value = this.value.getMinute();
            } else if ("second" == name) {
                value = this.value.getSecond();
            } else if ("millisecond" == name) {
                value = this.value.getMillisecond();
            } else if ("tzOffset" == name) {
                value = this.value.getTzOffset();
            } else if ("tzName" == name) {
                value = this.value.getTzName();
            } else if ("date" == name) {
                return new DateValue(this.value.getDate());
            } else if ("time" == name) {
                return new TimeValue(this.value.getTime());
            }
            if(typeof(value) === typeof(0))
                return new IntegerValue(value);
            else if(typeof(value) === typeof("z"))
                return new TextValue(value);
        } catch (error) {
            // don't do anything
        }
        return Value.prototype.getMemberValue.call(this, context, name);
    }

    equals(obj) {
        if (obj instanceof DateTimeValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    toDocumentValue(context) {
        return new TextValue(this.toString());
    }
}

exports.DateTimeValue = DateTimeValue;
