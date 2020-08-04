var PropertyValidator = require("./PropertyValidator").PropertyValidator;

class RequiredValidator extends PropertyValidator {
    constructor(validator) {
        super();
        this.validator = validator;
        return this;
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


exports.RequiredValidator = RequiredValidator;