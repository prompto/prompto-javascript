import { BooleanType } from '../type'
import { SyntaxError } from '../error'
import BaseValue from "./BaseValue";
import {Context} from "../runtime";
import IValue from "./IValue";
import {JsonObject, JsonParent} from "../json";

export default class BooleanValue extends BaseValue<boolean> {

    static TRUE = new BooleanValue(true);
    static FALSE = new BooleanValue(false);

    not: BooleanValue;

    constructor(value: boolean) {
        super(BooleanType.instance, value);
    }

    static init() {
        BooleanValue.TRUE.not = BooleanValue.FALSE;
        BooleanValue.FALSE.not = BooleanValue.TRUE;
    }

    static ValueOf(value: boolean): BooleanValue {
        return value ? BooleanValue.TRUE : BooleanValue.FALSE;
    }

    static Parse(text: string): BooleanValue {
        const bool = text=="true";
        return BooleanValue.ValueOf(bool);
    }

    convertToJavaScript() {
        return this.value;
    }

    getStorableData(): any {
        return this.value;
    }

    toJsonNode() {
        return this.value;
    }

    And(context: Context, value: IValue): IValue {
        if(value instanceof BooleanValue) {
            return BooleanValue.ValueOf(this.value && value.value);
        } else {
            throw new SyntaxError("Illegal: Boolean and " + typeof(value));
            return BooleanValue.FALSE;
        }
    }

    Or(context: Context, value: IValue): IValue {
        if(value instanceof BooleanValue) {
            return BooleanValue.ValueOf(this.value || value.value);
        } else {
            throw new SyntaxError("Illegal: Boolean or " + typeof(value));
            return BooleanValue.FALSE;
        }
    }

    Not() {
        return this.not;
    }

    toString() {
        return this.value.toString();
    }

    equals(obj: any) {
        if (obj instanceof BooleanValue) {
            return this.value == obj.value;
        } else {
            return false;
        }
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        if(Array.isArray(json))
            json.push(this.value);
        else
            json.set(fieldName, this.value);
    }
}

