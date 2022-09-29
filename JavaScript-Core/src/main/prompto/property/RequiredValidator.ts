import PropertyValidator from './PropertyValidator'
import {IType} from "../type";
import {Context} from "../runtime";
import {JsxProperty} from "../jsx";

export default class RequiredValidator extends PropertyValidator {

    validator: PropertyValidator;

    constructor(validator: PropertyValidator) {
        super();
        this.validator = validator;
    }

    toString() {
        return this.validator.toString();
    }

    isRequired() {
        return true;
    }

    required() {
        return this;
    }

    optional() {
        return this.validator;
    }

    getType(context: Context): IType {
        return this.validator.getType(context);
    }

    validate(context: Context, jsxProp: JsxProperty) {
        return this.validator.validate(context, jsxProp);
    }
}
