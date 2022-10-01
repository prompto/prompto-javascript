import BaseValue from "./BaseValue";
import {TimeValue, PeriodValue, IntegerValue, DateTimeValue, TextValue, IValue} from './index'
import { DateType} from '../type'
import { SyntaxError } from '../error'
import {LocalDate} from "../intrinsic";
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import {JsonNode, JsonParent} from "../json";
import {equalObjects} from "../utils";

export default class DateValue extends BaseValue<LocalDate> {
  
    constructor(value: LocalDate) {
        super(DateType.instance, value);
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

    Add(context: Context, value: IValue) {
        if (value instanceof PeriodValue) {
            return new DateValue(this.value.addPeriod(value.value));
        } if (value instanceof TimeValue) {
            return new DateTimeValue(this.value.addTime(value.value));
        } else {
            throw new SyntaxError("Illegal: Date + " + typeof(value));
        }
    }

    Subtract(context: Context, value: IValue) {
        if (value instanceof DateValue) {
            return new PeriodValue(this.value.subtractDate(value.value));
        } else if (value instanceof PeriodValue) {
            return new DateValue(this.value.subtractPeriod(value.value));
        } else {
            throw new SyntaxError("Illegal: Date - " + typeof(value));
        }
    }

    compareToValue(context: Context, value: IValue) {
        if (value instanceof DateValue || value instanceof DateTimeValue) {
            return this.cmp(value);
        } else {
            throw new SyntaxError("Illegal comparison: Date and " + typeof(value));
        }
    }

    cmp(value: DateValue | DateTimeValue) {
        const a = this.value.valueOf();
        const b = value.value.valueOf();
        return a > b ? 1 : (a == b ? 0 : -1);
    }

    GetMemberValue(context: Context, member: Identifier) {
        switch(member.name) {
            case "year":
                return new IntegerValue(this.value.getYear());
            case "month":
                return new IntegerValue(this.value.getMonth());
            case "dayOfMonth":
                return new IntegerValue(this.value.getUTCDate());
            case "dayOfYear":
                return new IntegerValue(this.value.getDayOfYear());
            default:
                return super.GetMemberValue(context, member);
        }
    }

    equals(obj: any) {
        return obj == this || (obj instanceof DateValue && equalObjects(this.value, obj.value));
    }

    toDocumentValue(context: Context) {
        return new TextValue(this.toString());
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        const value = withType ? { type: DateType.instance.name, value: this.value.toString() } : this.value.toString();
        if(Array.isArray(json))
            json.push(value as JsonNode);
        else
            json.set(fieldName, value as JsonNode);
    }

}



