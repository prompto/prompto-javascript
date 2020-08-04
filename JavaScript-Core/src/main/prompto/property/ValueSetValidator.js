var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var AnyType = require("../type/AnyType").AnyType;

class ValueSetValidator extends PropertyValidator {
    constructor(values) {
        super();
        this.values = values;
        return this;
    }

    getType(context) {
        return AnyType.instance;
    }

    validate(context, property) {
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
    }
}


exports.ValueSetValidator = ValueSetValidator;