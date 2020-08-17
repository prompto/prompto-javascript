

export default class TimeValue extends Value {
 
    constructor(value) {
        super(TimeType.instance);
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

    Add(context, value) {
        if (value instanceof PeriodValue) {
            return new TimeValue(this.value.addPeriod(value));
        } else {
            throw new SyntaxError("Illegal: TimeValue + " + typeof(value));
        }
    }

    Subtract(context, value) {
        if (value instanceof PeriodValue) {
            return new TimeValue(this.value.subtractPeriod(value.value));
        } else if (value instanceof TimeValue) {
            return new PeriodValue(this.value.subtractTime(value.value));
        } else {
            throw new SyntaxError("Illegal: TimeValue - " + typeof(value));
        }
    }

    compareToValue(context, value) {
        if (value instanceof TimeValue) {
            return this.cmp(value);
        } else {
            throw new SyntaxError("Illegal comparison: TimeValue and " + typeof(value));
        }
    }

    getMemberValue(context, name) {
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
    }

    cmp(obj) {
        const a = this.value.valueOf();
        const b = obj.value.valueOf();
        return a > b ? 1 : (a == b ? 0 : -1) ;
    }

    equals(obj) {
        if (obj instanceof TimeValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    toDocumentValue(context) {
        return new TextValue(this.toString());
    }
}

