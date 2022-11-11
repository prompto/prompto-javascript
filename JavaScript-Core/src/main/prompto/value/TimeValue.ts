import BaseValue from "./BaseValue";
import {PeriodValue, IntegerValue, TextValue, IValue} from './index'
import {TimeType} from '../type'
import {SyntaxError} from '../error'
import {Context} from "../runtime";
import {LocalTime, equalObjects} from "../intrinsic";
import {Identifier} from "../grammar";
import {JsonNode, JsonParent} from "../json";

export default class TimeValue extends BaseValue<LocalTime> {

    constructor(value: LocalTime) {
        super(TimeType.instance, value);
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

    Add(context: Context, value: IValue) {
        if (value instanceof PeriodValue) {
            return new TimeValue(this.value.addPeriod(value.value));
        } else {
            throw new SyntaxError("Illegal: TimeValue + " + typeof (value));
        }
    }

    Subtract(context: Context, value: IValue) {
        if (value instanceof PeriodValue) {
            return new TimeValue(this.value.subtractPeriod(value.value));
        } else if (value instanceof TimeValue) {
            return new PeriodValue(this.value.subtractTime(value.value));
        } else {
            throw new SyntaxError("Illegal: TimeValue - " + typeof (value));
        }
    }

    compareToValue(context: Context, value: IValue) {
        if (value instanceof TimeValue) {
            return this.cmp(value);
        } else {
            throw new SyntaxError("Illegal comparison: TimeValue and " + typeof (value));
        }
    }

    GetMemberValue(context: Context, member: Identifier) {
        switch (member.name) {
            case "hour":
                return new IntegerValue(this.value.getHour());
            case "minute":
                return new IntegerValue(this.value.getMinute());
            case "second":
                return new IntegerValue(this.value.getSecond());
            case "millisecond":
                return new IntegerValue(this.value.getMillisecond());
            default:
                return super.GetMemberValue(context, member);
        }
    }

    cmp(obj: TimeValue) {
        const a = this.value.valueOf();
        const b = obj.value.valueOf();
        return a > b ? 1 : (a === b ? 0 : -1);
    }

    equals(obj: any) {
        return obj == this || (obj instanceof TimeValue && equalObjects(this.value, obj.value));
    }

    toDocumentValue(context: Context) {
        return new TextValue(this.toString());
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        const value = withType ? {type: TimeType.instance.name, value: this.value.toString()} : this.value.toString();
        if (Array.isArray(json))
            json.push(value as JsonNode);
        else
            json.set(fieldName, value as JsonNode);
    }

}

