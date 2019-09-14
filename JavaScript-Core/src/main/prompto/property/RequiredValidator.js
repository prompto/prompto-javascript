var PropertyValidator = require("./PropertyValidator").PropertyValidator;

function RequiredValidator(validator) {
    PropertyValidator.call(this);
    this.validator = validator;
    return this;
}

RequiredValidator.prototype = Object.create(PropertyValidator.prototype);
RequiredValidator.prototype.constructor = RequiredValidator;


RequiredValidator.prototype.isRequired = function() {
    return true;
};


RequiredValidator.prototype.required = function() {
    return this;
};


RequiredValidator.prototype.optional = function() {
    return this.validator;
};


RequiredValidator.prototype.getType = function(context) {
    return this.validator.getType(context);
};


RequiredValidator.prototype.validate = function(context, property) {
    this.validator.validate(context, property);
};


exports.RequiredValidator = RequiredValidator;