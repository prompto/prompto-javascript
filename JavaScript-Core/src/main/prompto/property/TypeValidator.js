var PropertyValidator = require("./PropertyValidator").PropertyValidator;

function TypeValidator(type) {
    PropertyValidator.call(this);
    this.type = type;
    return this;
}

TypeValidator.prototype = Object.create(PropertyValidator.prototype);
TypeValidator.prototype.constructor = TypeValidator;


TypeValidator.prototype.getType = function(context) {
    return this.type;
};


TypeValidator.prototype.validate = function(context, property) {
    var actual = property.check(context);
    if(!this.type.isAssignableFrom(context, actual))
        context.problemListener.reportIllegalAssignment(property, this.type, actual);
};


exports.TypeValidator = TypeValidator;