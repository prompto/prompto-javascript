var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var AnyType = require("../type/AnyType").AnyType;

class AlwaysValidator extends PropertyValidator {
    constructor() {
        super();
        return this;
    }

    getType(context) {
        return AnyType.instance;
    }

    validate(context, property) {
        // accept any property
    }
}


AlwaysValidator.instance = new AlwaysValidator();

exports.AlwaysValidator = AlwaysValidator;