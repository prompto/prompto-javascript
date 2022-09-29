import {AlwaysValidator, PropertyValidator} from './index'
import {Context, Transpiler} from "../runtime";
import {JsxProperty} from "../jsx";

export default class Property {

    name: string | null;
    help: string | null;
    _validator: PropertyValidator;

    constructor() {
        this.name = null;
        this.help = null;
        this._validator = AlwaysValidator.instance;
    }

    get validator() {
        return this._validator;
    }

    set validator(validator: PropertyValidator) {
        if(this._validator.isRequired())
            this._validator = validator.required();
        else
            this._validator = validator.optional();
    }

    validate(context: Context, jsxProperty: JsxProperty) {
        this._validator.validate(context, jsxProperty);
    }

    declare(transpiler: Transpiler, jsxProperty: JsxProperty) {
        this._validator.declare(transpiler, jsxProperty);
    }

    transpile(transpiler: Transpiler, jsxProperty: JsxProperty) {
        this._validator.transpile(transpiler, jsxProperty);
    }

    isRequired() {
        return this._validator.isRequired();
    }

    setRequired(set: boolean) {
        this._validator = set ? this._validator.required() : this._validator.optional();
    }
}
