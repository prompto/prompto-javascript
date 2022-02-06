import Value from './Value.js'
import { PeriodValue, DateValue, TextValue, TimeValue, IntegerValue } from './index.js'
import { DateTimeType } from '../type/index.js'
import { SyntaxError } from '../error/index.js'

export default class DateTimeValue extends Value {
  
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

    toJsonNode() {
        return this.value.toString();
    }


    Add(context, value) {
        if (value instanceof PeriodValue) {
            const result = this.value.addPeriod(value.value);
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

    getMemberValue(context, id) {
        switch(id.name) {
            case "year":
                return new IntegerValue(this.value.getYear());
            case "month":
                return new IntegerValue(this.value.getMonth());
            case "dayOfMonth":
                return new IntegerValue(this.value.getDayOfMonth());
            case "dayOfYear":
                return new IntegerValue(this.value.getDayOfYear());
            case "hour":
                return new IntegerValue(this.value.getHour());
            case "minute":
                return new IntegerValue(this.value.getMinute());
            case "second":
                return new IntegerValue(this.value.getSecond());
            case "millisecond":
                return new IntegerValue(this.value.getMillisecond());
            case "tzOffset":
                return new IntegerValue(this.value.getTzOffset());
            case "tzName":
                return new TextValue(this.value.getTzName());
            case "date":
                return new DateValue(this.value.getDate());
            case "time":
                return new TimeValue(this.value.getTime());
            default:
                return super.getMemberValue(context, id);
         }
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

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        const value = withType ? { type: DateTimeType.instance.name, value: this.value.toString() } : this.value.toString();
        if(Array.isArray(json))
            json.push(value);
        else
            json[fieldName] = value;
    }

}

