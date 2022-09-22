import { RequiredValidator } from '../property'

export default class PropertyValidator {

    isRequired() {
        return false;
    }

    optional() {
        return this;
    }

    required() {
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

