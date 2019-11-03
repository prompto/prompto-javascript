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


PropertyValidator.prototype.getMethodDeclarations = function(context) {
    return [];
};


exports.PropertyValidator = PropertyValidator;
