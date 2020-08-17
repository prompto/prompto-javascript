
export default class Property {

    constructor() {
        this.name = null;
        this.help = null;
        this._validator = AlwaysValidator.instance;
    }

    get validator() {
        return this._validator;
    }

    set validator(validator) {
        if(this._validator.isRequired())
            this._validator = validator.required();
        else
            this._validator = validator.optional();
    }

    validate(context, jsxProperty) {
        this._validator.validate(context, jsxProperty);
    }

    declare(transpiler, jsxProperty) {
        this._validator.declare(transpiler, jsxProperty);
    }

    transpile(transpiler, jsxProperty) {
        this._validator.transpile(transpiler, jsxProperty);
    }

    isRequired() {
        return this._validator.isRequired();
    }

    setRequired(set) {
        this._validator = set ? this._validator.required() : this._validator.optional();
    }
}