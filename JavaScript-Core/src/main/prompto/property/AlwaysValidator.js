var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var AnyType = require("../type/AnyType").AnyType;

function AlwaysValidator() {
    PropertyValidator.call(this);
    return this;
}

AlwaysValidator.prototype = Object.create(PropertyValidator.prototype);
AlwaysValidator.prototype.constructor = AlwaysValidator;


AlwaysValidator.prototype.getType = function(context) {
    return AnyType.instance;
};


AlwaysValidator.prototype.validate = function(context, property) {
    // accept any property
};


AlwaysValidator.instance = new AlwaysValidator();

exports.AlwaysValidator = AlwaysValidator;