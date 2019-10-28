var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var MethodType = require("../type/MethodType").MethodType;
var anify = require("../utils/TypeUtils").anify;

function TypeValidator(type) {
    PropertyValidator.call(this);
    this.type = anify(type);
    return this;
}

TypeValidator.prototype = Object.create(PropertyValidator.prototype);
TypeValidator.prototype.constructor = TypeValidator;


TypeValidator.prototype.getType = function(context) {
    return this.type;
};


TypeValidator.prototype.validate = function(context, property) {
    var actual = this.type instanceof MethodType ? property.checkProto(context, this.type) : property.check(context);
    if(!this.type.isAssignableFrom(context, anify(actual)))
        context.problemListener.reportIllegalAssignment(property, this.type, actual);
};


exports.TypeValidator = TypeValidator;