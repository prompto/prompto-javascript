import BaseValue from "./BaseValue";
import {IntegerValue, IValue, TextValue} from './index'
import { SyntaxError } from '../error'
import { PeriodType } from '../type'
import {Period} from "../intrinsic";
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import {equalObjects} from "../utils";


export default class PeriodValue extends BaseValue<Period> {
 
    constructor(value: Period) {
        super(PeriodType.instance, value);
        ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"].forEach(function(name) {
            Object.defineProperty(this, name, {
                get: () => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    const value = this.value as object;
                    return value[name as keyof typeof value];
                }
            });
        }, this)
    }

    toJsonNode() {
        return this.value.toString();
    }

    totalMilliseconds() {
        return this.value.totalMilliseconds();
    }

    convertToJavaScript() {
        return this.value;
    }

    Add(context: Context, value: IValue): IValue {
        if (value instanceof PeriodValue) {
            return new PeriodValue(this.value.add(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
        }
    }

    Minus(context: Context): IValue {
        return new PeriodValue(this.value.minus());
    }

    Subtract(context: Context, value: IValue): IValue {
        if (value instanceof PeriodValue) {
            return new PeriodValue(this.value.subtract(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
        }
    }

    Multiply(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue) {
            return new PeriodValue(this.value.multiply(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue * " + typeof(value));
        }
    }

    toString() {
        return this.value.toString();
    }

    equals(obj: any) {
        return obj == this || (obj instanceof PeriodValue && equalObjects(this.value, obj.value));
    }

    GetMemberValue(context: Context, member: Identifier): IValue {
        switch(member.name) {
            case "years":
            case "months":
            case "weeks":
            case "days":
            case "hours":
            case "minutes":
            case "seconds":
            case "milliseconds":
                {
                    const value = this.value as object;
                    return new IntegerValue(value[member.name as keyof typeof value]);
                }
            default:
                return super.GetMemberValue(context, member);
        }


    }

    toDocumentValue(context: Context): IValue {
        return new TextValue(this.toString());
    }
}


