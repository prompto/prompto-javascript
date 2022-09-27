import IValue from './IValue.ts'
import { TimeValue, PeriodValue, IntegerValue, DateTimeValue, TextValue } from './index.ts'
import { DateType} from '../type'
import { SyntaxError } from '../error'

export default class DateValue extends IValue {
  
    constructor(value) {
        super(DateType.instance);
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    toJsonNode() {
        return this.value.toString();
    }

    getStorableData(): any {
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

    getMemberValue(context, id) {
        switch(id.name) {
            case "year":
                return new IntegerValue(this.value.getYear());
            case "month":
                return new IntegerValue(this.value.getMonth());
            case "dayOfMonth":
                return new IntegerValue(this.value.getUTCDate());
            case "dayOfYear":
                return new IntegerValue(this.value.getDayOfYear());
            default:
                return super.getMemberValue(context, id);
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

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        const value = withType ? { type: DateType.instance.name, value: this.value.toString() } : this.value.toString();
        if(Array.isArray(json))
            json.push(value);
        else
            json[fieldName] = value;
    }

}



