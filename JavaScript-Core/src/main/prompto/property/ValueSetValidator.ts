import PropertyValidator from './PropertyValidator'
import { AnyType } from '../type'
import {Context} from "../runtime";
import {JsxProperty} from "../jsx";

export default class ValueSetValidator extends PropertyValidator {

    values: Set<string>;

    constructor(values: Set<string>) {
        super();
        this.values = values;
    }

    toString() {
        return "<" + Array.from(this.values).join(", ") + ">";
    }

    getType(context: Context) {
        return AnyType.instance;
    }

    validate(context: Context, jsxProp: JsxProperty) {
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

