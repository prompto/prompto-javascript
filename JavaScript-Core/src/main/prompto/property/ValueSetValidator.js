import PropertyValidator from './PropertyValidator.js'
import { AnyType } from '../type/index.js'

export default class ValueSetValidator extends PropertyValidator {

    constructor(values) {
        super();
        this.values = values;
    }

    toString() {
        return "<" + Array.from(this.values).join(", ") + ">";
    }

    getType(context) {
        return AnyType.instance;
    }

    validate(context, jsxProp) {
        const value = jsxProp.value;
        if(value && value.isLiteral()) {
            let text = value.toString();
            if (text.startsWith('"') && text.endsWith('"'))
                text = text.substring(1, text.length - 1);
            if (this.values.has(text))
                return true;
            else {
                const message = "Illegal value " + (text ? text : "<null>") + ", expected one of <" + Array.from(this.values).join(", ") + ">";
                context.problemListener.reportIllegalValue(jsxProp, message);
                return false;
            }
        } else
            return true; // can only validate literals
    }
}

