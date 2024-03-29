import Value from './Value.js'
import { IntegerValue } from './index.js'
import { SyntaxError, DivideByZeroError } from '../error/index.js'
import { DecimalType} from '../type/index.js'
import { decimalToString } from '../utils/index.js'

export default class DecimalValue extends Value {

    constructor(value) {
        super(DecimalType.instance);
        this.value = value;
    }

    static Parse(text) {
        return new DecimalValue(parseFloat(text));
    }

    toString() {
        return decimalToString(this.value);
    }

    toJsonNode() {
        return this.value;
    }

    convertToJavaScript() {
        return this.value;
    }

    /*jshint bitwise:false*/
    IntegerValue() {
        return Math.floor(this.value);
    }

    DecimalValue() {
        return this.value;
    }

    getStorableData() {
        return this.value;
    }

    Add(context, value) {
        if (value instanceof IntegerValue) {
            return new DecimalValue(this.value + value.IntegerValue());
        } else if (value instanceof DecimalValue) {
            return new DecimalValue(this.value + value.DecimalValue());
        } else {
            throw new SyntaxError("Illegal: DecimalValue + " + typeof(value));
        }
    }

    Subtract(context, value) {
        if (value instanceof IntegerValue) {
            return new DecimalValue(this.value - value.IntegerValue());
        } else if (value instanceof DecimalValue) {
            return new DecimalValue(this.value - value.DecimalValue());
        } else {
            throw new SyntaxError("Illegal: DecimalValue - " + typeof(value));
        }
    }

    Multiply(context, value) {
        if (value instanceof IntegerValue) {
            return new DecimalValue(this.value * value.IntegerValue());
        } else if (value instanceof DecimalValue) {
            return new DecimalValue(this.value * value.DecimalValue());
        } else {
            throw new SyntaxError("Illegal: DecimalValue * " + typeof(value));
        }
    }

    Divide(context, value) {
        if (value instanceof IntegerValue || value instanceof DecimalValue) {
            if (value.DecimalValue() === 0.0) {
                throw new DivideByZeroError();
            } else {
                return new DecimalValue(this.DecimalValue() / value.DecimalValue());
            }
        } else {
            throw new SyntaxError("Illegal: DecimalValue / " + typeof(value));
        }
    }

    IntDivide(context, value) {
        if (value instanceof IntegerValue) {
            if (value.IntegerValue() === 0) {
                throw new DivideByZeroError();
            } else {
                return new IntegerValue(this.DecimalValue() / value.IntegerValue());
            }
        } else {
            throw new SyntaxError("Illegal: DecimalValue \\ " + typeof(value));
        }
    }

    Modulo(context, value) {
        if (value instanceof IntegerValue || value instanceof DecimalValue) {
            if (value.DecimalValue() === 0.0) {
                throw new DivideByZeroError();
            } else {
                return new DecimalValue(this.DecimalValue() % value.DecimalValue());
            }
        } else {
            throw new SyntaxError("Illegal: DecimalValue % " + typeof(value));
        }
    }

    Minus(context) {
        return new DecimalValue(-this.value);
    }

    compareToValue(context, value) {
        if (value instanceof IntegerValue || value instanceof DecimalValue) {
            return this.value > value.value ? 1 : this.value === value.value ? 0 : -1;
        } else {
            throw new SyntaxError("Illegal comparison: IntegerValue and " + typeof(value));
        }
    }

   equals(obj) {
        if (obj instanceof IntegerValue || obj instanceof DecimalValue) {
            return this.value === obj.value;
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


