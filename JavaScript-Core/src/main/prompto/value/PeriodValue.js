var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var PeriodType = require("../type/PeriodType").PeriodType;

function PeriodValue(value) {
    Value.call(this, PeriodType.instance);
    this.value = value;
    ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "millis"].forEach(function(name) {
        Object.defineProperty(this, name, {
            get: function () {
                return this.value[name];
            }
        });
    }, this)
    return this;
}

PeriodValue.prototype = Object.create(Value.prototype);
PeriodValue.prototype.constructor = PeriodValue;



PeriodValue.prototype.Add = function(context, value) {
    if (value instanceof PeriodValue) {
        return new PeriodValue(this.value.add(value.value));
    } else {
        throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
    }
};

PeriodValue.prototype.Minus = function(context) {
    return new PeriodValue(this.value.minus());
};

PeriodValue.prototype.Subtract = function(context, value) {
    if (value instanceof PeriodValue) {
        return new PeriodValue(this.value.subtract(value.value));
    } else {
        throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
    }
};


PeriodValue.prototype.Multiply = function(context, value) {
    if (value instanceof IntegerValue) {
        return new PeriodValue(this.value.multiply(value.value));
    } else {
        throw new SyntaxError("Illegal: PeriodValue * " + typeof(value));
    }
};

/*
 override
 public Object ConvertTo(Type type)
 {
 return this; // TODO convert to TimeSpan
 }

*/

PeriodValue.prototype.toString = function() {
    return this.value.toString();
};

PeriodValue.prototype.equals = function(obj) {
    if (obj instanceof PeriodValue) {
        return this.years == obj.years &&
            this.months == obj.months &&
            this.weeks == obj.weeks &&
            this.days == obj.days &&
            this.hours == obj.hours &&
            this.minutes == obj.minutes &&
            this.seconds == obj.seconds &&
            this.millis == obj.millis;
    } else {
        return false;
    }
};

/*

 override
 public int GetHashCode()
 {
 return ToString().GetHashCode();
 }


 }
 }


 */
/*
 public static final PeriodValue ZERO = new PeriodValue(0, 0, 0, 0, 0, 0, 0, 0);

 org.joda.time.PeriodValue value;

 public PeriodValue(int years, int months, int weeks, int days, int hours, int minutes, int seconds, int millis)
 {
 value = new org.joda.time.PeriodValue(years, months, weeks, days, hours, minutes, seconds, millis);
 }

 public PeriodValue(org.joda.time.PeriodValue value)
 {
 this.value = value;
 }

 public org.joda.time.PeriodValue getValue() {
 return value;
 }


 @Override
 public IValue Add(Context context, IValue value) throws PromptoError
 {
 if (value instanceof PeriodValue)
 return this.plus((PeriodValue)value);
 else
 throw new SyntaxError("Illegal: PeriodValue + " + value.getClass().getSimpleName());
 }

 @Override
 public IValue Subtract(Context context, IValue value) throws PromptoError
 {
 if (value instanceof PeriodValue)
 return this.minus((PeriodValue)value);
 else
 throw new SyntaxError("Illegal: PeriodValue - " + value.getClass().getSimpleName());
 }

 @Override
 public IValue Multiply(Context context, IValue value) throws PromptoError
 {
 if (value instanceof IntegerValue)
 {
 int count = (int)((IntegerValue)value).IntegerValue();
 if (count < 0)
 throw new SyntaxError("Negative repeat count:" + count);
 if (count == 0)
 return PeriodValue.ZERO;
 if (count == 1)
 return this;
 return this.times(count);
 }
 else
 throw new SyntaxError("Illegal: PeriodValue * " + value.getClass().getSimpleName());
 }

 @Override
 public Object ConvertTo(Class<?> type)
 {
 return value;
 }

 public PeriodValue minus(PeriodValue period)
 {
 return new PeriodValue( this.value.minus(period.value));
 }



 public PeriodValue plus(PeriodValue period)
 {
 return new PeriodValue(this.value.plus(period.value));
 }

 public PeriodValue times(int count)
 {
 return new PeriodValue(
 this.value.getYears() * count,
 this.value.getMonths() * count,
 this.value.getWeeks() * count,
 this.value.getDays() * count,
 this.value.getHours() * count,
 this.value.getMinutes() * count,
 this.value.getSeconds() * count,
 this.value.getMillis() * count);
 }

 @Override
 public String toString()
 {
 return value.toString();
 }

 @Override
 public boolean equals(Object obj)
 {
 if (obj instanceof PeriodValue)
 return this.value.equals(((PeriodValue)obj).value);
 else
 return false;
 }

 @Override
 public int hashCode()
 {
 return value.hashCode();
 }


 }
 */

exports.PeriodValue = PeriodValue;
