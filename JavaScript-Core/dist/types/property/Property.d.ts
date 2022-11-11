import { PropertyValidator } from './index';
import { Context, Transpiler } from "../runtime";
import { JsxProperty } from "../jsx";
export default class Property {
    name: string | null;
    help: string | null;
    _validator: PropertyValidator;
    constructor();
    get validator(): PropertyValidator;
    set validator(validator: PropertyValidator);
    validate(context: Context, jsxProperty: JsxProperty): void;
    declare(transpiler: Transpiler, jsxProperty: JsxProperty): void;
    transpile(transpiler: Transpiler, jsxProperty: JsxProperty): void;
    isRequired(): boolean;
    setRequired(set: boolean): void;
}
