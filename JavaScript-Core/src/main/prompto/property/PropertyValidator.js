function PropertyValidator() {
    return this;
}

PropertyValidator.prototype.isRequired = function() {
    return false;
};


PropertyValidator.prototype.optional = function() {
    return this;
};

exports.PropertyValidator = PropertyValidator;
