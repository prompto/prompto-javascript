import BaseValue from "./BaseValue";
import {DecimalValue, DbIdValue, IValue} from './index'
import { SyntaxError, DivideByZeroError } from '../error'
import { IntegerType } from '../type'
import {Context} from "../runtime";
import {JsonParent} from "../json";


export default class IntegerValue extends BaseValue<number> {

    static Parse(text: string): IntegerValue {
        return new IntegerValue(parseInt(text));
    }

    constructor(value: number) {
        super(IntegerType.instance, value>0 ? Math.floor(value) : Math.ceil(value));
    }

    toString() {
        return this.value.toString();
    }

    toJsonNode() {
        return this.value;
    }

    getStorableData(): any {
        return this.value;
    }

    convertToJavaScript(): number {
        return this.value;
    }

    IntegerValue(): number {
        return this.value;
    }

    DecimalValue(): number {
        return this.value * 1.0;
    }

    Add(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue) {
            return new IntegerValue(this.value + value.value);
        } else if (value instanceof DecimalValue) {
            return new DecimalValue(value.DecimalValue() + this.value);
        } else {
            throw new SyntaxError("Illegal: IntegerValue + " + typeof(value));
        }
    }

    Subtract(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue) {
            return new IntegerValue(this.value - value.value);
        } else if (value instanceof DecimalValue) {
            return new DecimalValue(this.value - value.DecimalValue());
        } else {
            throw new SyntaxError("Illegal: IntegerValue - " + typeof(value));
        }
    }

    Multiply(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue) {
            return new IntegerValue(this.value * value.value);
        } else if (value instanceof DecimalValue) {
            return new DecimalValue(value.value * this.value);
        } else if (value.Multiply) {
            return value.Multiply(context, this);
        } else {
            throw new SyntaxError("Illegal: IntegerValue * " + typeof(value));
        }
    }

    Divide(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue || value instanceof DecimalValue) {
            if (value.DecimalValue() == 0.0) {
                throw new DivideByZeroError();
            } else {
                return new DecimalValue(this.DecimalValue() / value.DecimalValue());
            }
        } else {
            throw new SyntaxError("Illegal: IntegerValue / " + typeof(value));
        }
    }

    IntDivide(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue) {
            if (value.IntegerValue() == 0) {
                throw new DivideByZeroError();
            } else {
                return new IntegerValue(this.IntegerValue() / value.IntegerValue());
            }
        } else {
            throw new SyntaxError("Illegal: IntegerValue \\ " + typeof(value));
        }
    }

    Modulo(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue) {
            if (value.IntegerValue() == 0) {
                throw new DivideByZeroError();
            } else {
                return new IntegerValue(this.IntegerValue() % value.IntegerValue());
            }
        } else {
            throw new SyntaxError("Illegal: IntegerValue \\ " + typeof(value));
        }
    }

    Minus(context: Context): IValue {
        return new IntegerValue(-this.value);
    }

    cmp(obj: IntegerValue) {
        return this.value > obj.IntegerValue() ? 1 : this.value == obj.IntegerValue() ? 0 : -1 ;
    }

    compareToValue(context: Context, value: IValue) {
        if (value instanceof IntegerValue || value instanceof DecimalValue) {
            return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
        } else {
            throw new SyntaxError("Illegal comparison: IntegerValue and " + typeof(value));
        }
    }

    equals(obj: any) {
        return obj == this || (obj instanceof IntegerValue && this.value == obj.value)
            || (obj instanceof DecimalValue && this.value == obj.value)
            ||(obj instanceof DbIdValue && this.value == obj.value);
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        if(Array.isArray(json))
            json.push(this.value);
        else
            json.set(fieldName, this.value);
    }
}
