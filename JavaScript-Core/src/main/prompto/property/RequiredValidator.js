import PropertyValidator from './PropertyValidator.js'

export default class RequiredValidator extends PropertyValidator {

    constructor(validator) {
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

    getType(context) {
        return this.validator.getType(context);
    }

    validate(context, jsxProp) {
        return this.validator.validate(context, jsxProp);
    }
}
