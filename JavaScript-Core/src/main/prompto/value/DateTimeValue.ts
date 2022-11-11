import BaseValue from "./BaseValue";
import {PeriodValue, DateValue, TextValue, TimeValue, IntegerValue, IValue} from './index'
import { DateTimeType } from '../type'
import { SyntaxError } from '../error'
import {DateTime, equalObjects} from "../intrinsic";
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import {JsonNode, JsonParent} from "../json";

export default class DateTimeValue extends BaseValue<DateTime> {
  
    constructor(value: DateTime) {
        super(DateTimeType.instance, value);
   }

    getStorableData(): any {
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


    Add(context: Context, value: IValue) {
        if (value instanceof PeriodValue) {
            const result = this.value.addPeriod(value.value);
            return new DateTimeValue(result);
        } else {
            throw new SyntaxError("Illegal: DateTimeValue + " + typeof(value));
        }
    }

    Subtract(context: Context, value: IValue) {
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

    compareToValue(context: Context, value: IValue) {
        if (value instanceof DateTimeValue) {
            return this.value.compareTo(value.value.date, value.value.tzOffset);
        } else if (value instanceof DateValue) {
            return this.value.compareTo(value.value, 0);
        } else {
            throw new SyntaxError("Illegal comparison: DateTimeValue and " + typeof(value));
        }
    }

    GetMemberValue(context: Context, member: Identifier): IValue {
        switch(member.name) {
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
                return super.GetMemberValue(context, member);
         }
    }

    equals(obj: any) {
        return obj == this || (obj instanceof DateTimeValue && equalObjects(this.value, obj.value));
    }

    toDocumentValue(context: Context) {
        return new TextValue(this.toString());
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        const value = withType ? { type: DateTimeType.instance.name, value: this.value.toString() } : this.value.toString();
        if(Array.isArray(json))
            json.push(value as JsonNode);
        else
            json.set(fieldName, value as JsonNode);
    }

}

