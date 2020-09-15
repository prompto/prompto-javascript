import Value from './Value.js'
import { BooleanType } from '../type/index.js'
import { SyntaxError } from '../error/index.js'

export default class BooleanValue extends Value {
  
    constructor(value) {
        super(BooleanType.instance);
        this.value = value;
    }

    static ValueOf(value) {
        return value ? BooleanValue.TRUE : BooleanValue.FALSE;
    }

    static Parse(text) {
        const bool = text==="true";
        return BooleanValue.ValueOf(bool);
    }

    getStorableData() {
        return this.value;
    }

    getValue() {
        return this.value;
    }

    And(value) {
        if(value instanceof BooleanValue) {
            return BooleanValue.ValueOf(this.value && value.value);
        } else {
            throw new SyntaxError("Illegal: Boolean and " + typeof(value));
        }
    }

    Or(value) {
        if(value instanceof BooleanValue) {
            return BooleanValue.ValueOf(this.value || value.value);
        } else {
            throw new SyntaxError("Illegal: Boolean or " + typeof(value));
        }
    }

    Not() {
        return this.not;
    }

    toString() {
        return this.value.toString();
    }

    equals(obj) {
        if (obj instanceof BooleanValue) {
            return this.value == obj.value;
        } else {
            return false;
        }
    }

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        if(Array.isArray(json))
            json.push(this.value);
        else
            json[fieldName] = this.value;
    }
}

BooleanValue.TRUE = new BooleanValue(true);
BooleanValue.FALSE = new BooleanValue(false);
BooleanValue.TRUE.not = BooleanValue.FALSE;
BooleanValue.FALSE.not = BooleanValue.TRUE;

