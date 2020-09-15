import PropertyValidator from './PropertyValidator.js'

export default class RequiredValidator extends PropertyValidator {

    constructor(validator) {
        super();
        this.validator = validator;
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

    validate(context, property) {
        this.validator.validate(context, property);
    }
}
