var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var PeriodType = require("../type/PeriodType").PeriodType;

function PeriodValue(data) {
    Value.call(this, PeriodType.instance);
    this.years = data[0] || null;
    this.months = data[1] || null;
    this.weeks = data[2] || null;
    this.days = data[3] || null;
    this.hours = data[4] || null;
    this.minutes = data[5] || null;
    this.seconds = data[6] || null;
    this.millis = data[7] || null;
    return this;
}

PeriodValue.prototype = Object.create(Value.prototype);
PeriodValue.prototype.constructor = PeriodValue;


/*
 public PeriodValue(int years, int months, int weeks, int days, int hours, int minutes, int seconds, int millis)
 {
 this.Years = years;
 this.Months = months;
 this.Weeks = weeks;
 this.Days = days;
 this.Hours = hours;
 this.Minutes = minutes;
 this.Seconds = seconds;
 this.Millis = millis;
 }

 private PeriodValue(int[] data)
 : this(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7])
 {
 }

 public int Years { get; set; }

 public int Months { get; set; }

 public int Days { get; set; }

 public int Weeks { get; set; }

 public int Hours { get; set; }

 public int Minutes { get; set; }

 public int Seconds { get; set; }

 public int Millis { get; set; }

*/

PeriodValue.prototype.Add = function(context, value) {
    if (value instanceof PeriodValue) {
        return this.plus(value);
    } else {
        throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
    }
};

PeriodValue.prototype.plus = function(period) {
    var data = [];
    data[0] = this.years + period.years;
    data[1] = this.months + period.months;
    data[2] = this.weeks + period.weeks;
    data[3] = this.days + period.days;
    data[4] = this.hours + period.hours;
    data[5] = this.minutes + period.minutes;
    var seconds = (this.seconds + period.seconds) + ((this.millis + period.millis)/1000.0);
    data[6] = Math.floor(seconds);
    var millis = Math.round(( seconds * 1000 ) % 1000);
    data[7] = Math.floor(Math.abs(millis));
    return new PeriodValue(data);
};


PeriodValue.prototype.Minus = function(context) {
    var data = [];
    data[0] = -this.years;
    data[1] = -this.months;
    data[2] = -this.weeks;
    data[3] = -this.days;
    data[4] = -this.hours;
    data[5] = -this.minutes;
    data[6] = -this.seconds;
    data[7] = -this.millis;
    return new PeriodValue(data);
};

PeriodValue.prototype.Subtract = function(context, value) {
    if (value instanceof PeriodValue) {
        return this.minus(value);
    } else {
        throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
    }
};

PeriodValue.prototype.minus = function(period) {
    var data = [];
    data[0] = this.years - period.years;
    data[1] = this.months - period.months;
    data[2] = this.weeks - period.weeks;
    data[3] = this.days - period.days;
    data[4] = this.hours - period.hours;
    data[5] = this.minutes - period.minutes;
    var seconds = (this.seconds + this.millis/1000.0) - (period.seconds + period.millis/1000.0);
    data[6] = Math.floor(seconds);
    var millis = Math.round(( seconds * 1000 ) % 1000);
    data[7] = Math.floor(Math.abs(millis));
    return new PeriodValue(data);
};

PeriodValue.prototype.Multiply = function(context, value) {
    if (value instanceof IntegerValue) {
        return this.multiply(value);
    } else {
        throw new SyntaxError("Illegal: PeriodValue * " + typeof(value));
    }
};

PeriodValue.prototype.multiply = function(value) {
    var count = value.value;
    if (count == 0) {
        return new PeriodValue([]);
    } else if (count == 1) {
        return this;
    } else {
        var data = [];
        data[0] = this.years * count;
        data[1] = this.months * count;
        data[2] = this.weeks * count;
        data[3] = this.days * count;
        data[4] = this.hours * count;
        data[5] = this.minutes * count;
        var seconds = (this.seconds + this.millis/1000.0) * count;
        data[6] = Math.floor(seconds);
        var millis = Math.round(( seconds * 1000 ) % 1000);
        data[7] = Math.floor(Math.abs(millis));
        return new PeriodValue(data);
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
    var s = "P";
    if(this.years) {
        s += this.years;
        s += "Y";
    }
    if (this.months) {
        s += this.months;
        s += "M";
    }
    if (this.weeks) {
        s += this.weeks;
        s += "W";
    }
    if (this.days) {
        s += this.days;
        s += "D";
    }
    if (this.hours || this.minutes || this.seconds || this.millis) {
        s += "T";
        if (this.hours) {
            s += this.hours;
            s += "H";
        }
        if (this.minutes) {
            s += this.minutes;
            s += "M";
        }
        if (this.seconds || this.millis) {
            s += this.seconds;
            if (this.millis) {
                s += ".";
                s += ("000" + this.millis).slice(-3);
            }
            s += "S";
        }
    }
    return s;
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
