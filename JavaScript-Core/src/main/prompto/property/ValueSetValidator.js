import PropertyValidator from './PropertyValidator.js'
import { AnyType } from '../type/index.js'

export default class ValueSetValidator extends PropertyValidator {

    constructor(values) {
        super();
        this.values = values;
    }

    getType(context) {
        return AnyType.instance;
    }

    validate(context, property) {
        const value = property.value;
        if(value.isLiteral()) {
            let text = value.toString();
            if(text.startsWith("\"") && text.endsWith("\""))
                text = text.substring(1, text.length - 1);
            if(!this.values.has(text)) {
                const message = "Illegal value " + text + ", expected one of " + this.values;
                context.problemListener.reportIllegalValue(property, message);
            }
        }
    }
}

