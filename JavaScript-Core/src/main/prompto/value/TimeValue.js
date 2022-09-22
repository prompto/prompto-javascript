import Value from '../../../main/prompto/value/Value.ts'
import {PeriodValue, IntegerValue, TextValue} from './index.ts'
import {TimeType} from '../type'
import {SyntaxError} from '../error'

export default class TimeValue extends Value {

    constructor(value) {
        super(TimeType.instance);
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

    Add(context, value) {
        if (value instanceof PeriodValue) {
            return new TimeValue(this.value.addPeriod(value));
        } else {
            throw new SyntaxError("Illegal: TimeValue + " + typeof (value));
        }
    }

    Subtract(context, value) {
        if (value instanceof PeriodValue) {
            return new TimeValue(this.value.subtractPeriod(value.value));
        } else if (value instanceof TimeValue) {
            return new PeriodValue(this.value.subtractTime(value.value));
        } else {
            throw new SyntaxError("Illegal: TimeValue - " + typeof (value));
        }
    }

    compareToValue(context, value) {
        if (value instanceof TimeValue) {
            return this.cmp(value);
        } else {
            throw new SyntaxError("Illegal comparison: TimeValue and " + typeof (value));
        }
    }

    getMemberValue(context, id) {
        switch (id.name) {
            case "hour":
                return new IntegerValue(this.value.getHour());
            case "minute":
                return new IntegerValue(this.value.getMinute());
            case "second":
                return new IntegerValue(this.value.getSecond());
            case "millisecond":
                return new IntegerValue(this.value.getMillisecond());
            default:
                return super.getMemberValue(context, id);
        }
    }

    cmp(obj) {
        const a = this.value.valueOf();
        const b = obj.value.valueOf();
        return a > b ? 1 : (a === b ? 0 : -1);
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

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        const value = withType ? {type: TimeType.instance.name, value: this.value.toString()} : this.value.toString();
        if (Array.isArray(json))
            json.push(value);
        else
            json[fieldName] = value;
    }

}

