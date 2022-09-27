import IValue from './IValue.ts'
import { IntegerValue, TextValue } from './index.ts'
import { SyntaxError } from '../error'
import { PeriodType } from '../type'


export default class PeriodValue extends IValue {
 
    constructor(value) {
        super(PeriodType.instance);
        this.value = value;
        ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"].forEach(function(name) {
            Object.defineProperty(this, name, {
                get: function () {
                    return this.value[name];
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

    Add(context, value) {
        if (value instanceof PeriodValue) {
            return new PeriodValue(this.value.add(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
        }
    }

    Minus(context) {
        return new PeriodValue(this.value.minus());
    }

    Subtract(context, value) {
        if (value instanceof PeriodValue) {
            return new PeriodValue(this.value.subtract(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
        }
    }

    Multiply(context, value) {
        if (value instanceof IntegerValue) {
            return new PeriodValue(this.value.multiply(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue * " + typeof(value));
        }
    }

    toString() {
        return this.value.toString();
    }

    equals(obj) {
        if (obj instanceof PeriodValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    getMemberValue(context, id) {
        switch(id.name) {
            case "years":
            case "months":
            case "weeks":
            case "days":
            case "hours":
            case "minutes":
            case "seconds":
            case "milliseconds":
                return new IntegerValue(this.value[id.name]);
            default:
                return super.getMemberValue(context, id);
        }


    }

    toDocumentValue(context) {
        return new TextValue(this.toString());
    }
}


