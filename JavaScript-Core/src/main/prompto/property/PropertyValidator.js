function PropertyValidator() {
    return this;
}

PropertyValidator.prototype.isRequired = function() {
    return false;
};


PropertyValidator.prototype.optional = function() {
    return this;
};


PropertyValidator.prototype.required = function() {
    var RequiredValidator = require("./RequiredValidator").RequiredValidator;
    return new RequiredValidator(this);
};


exports.PropertyValidator = PropertyValidator;
