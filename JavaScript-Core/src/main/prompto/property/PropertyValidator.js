class PropertyValidator {
    constructor() {
        return this;
    }

    isRequired() {
        return false;
    }

    optional() {
        return this;
    }

    required() {
        const RequiredValidator = require("./RequiredValidator").RequiredValidator;
        return new RequiredValidator(this);
    }

    getMethodDeclarations(context) {
        return [];
    }

    declare(transpiler, jsxProp) {
        jsxProp.declare(transpiler);
    }

    transpile(transpiler, jsxProp) {
        jsxProp.transpile(transpiler);
    }
}


exports.PropertyValidator = PropertyValidator;
