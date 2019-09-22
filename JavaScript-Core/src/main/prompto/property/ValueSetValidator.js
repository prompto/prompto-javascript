var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var AnyType = require("../type/AnyType").AnyType;

function ValueSetValidator(values) {
    PropertyValidator.call(this);
    this.values = values;
    return this;
}

ValueSetValidator.prototype = Object.create(PropertyValidator.prototype);
ValueSetValidator.prototype.constructor = ValueSetValidator;


ValueSetValidator.prototype.getType = function(context) {
    return AnyType.instance;
};


ValueSetValidator.prototype.validate = function(context, property) {
    var value = property.value;
    if(value.isLiteral()) {
        var text = value.toString();
        if(text.startsWith("\"") && text.endsWith("\""))
            text = text.substring(1, text.length - 1);
        if(!this.values.has(text)) {
            var message = "Illegal value " + text + ", expected one of " + this.values;
            context.problemListener.reportIllegalValue(property, message);
        }
    }
};


exports.ValueSetValidator = ValueSetValidator;