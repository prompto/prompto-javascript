var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var AnyType = require("../type/AnyType").AnyType;

function TypeSetValidator(types) {
    PropertyValidator.call(this);
    this.types = types;
    return this;
}

TypeSetValidator.prototype = Object.create(PropertyValidator.prototype);
TypeSetValidator.prototype.constructor = TypeSetValidator;


TypeSetValidator.prototype.getType = function(context) {
    return AnyType.instance;
};


TypeSetValidator.prototype.validate = function(context, property) {
    var actual = property.check(context);
    if(!Array.from(this.types).some(function(type) { return type.isAssignableFrom(context, actual); }, this))
        context.problemListener.reportIllegalAssignment(property, this.types, actual);
};


exports.TypeSetValidator = TypeSetValidator;