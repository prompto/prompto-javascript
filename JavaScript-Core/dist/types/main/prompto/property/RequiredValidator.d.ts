import PropertyValidator from './PropertyValidator';
import { IType } from "../type";
import { Context } from "../runtime";
import { JsxProperty } from "../jsx";
export default class RequiredValidator extends PropertyValidator {
    validator: PropertyValidator;
    constructor(validator: PropertyValidator);
    toString(): string;
    isRequired(): boolean;
    required(): this;
    optional(): PropertyValidator;
    getType(context: Context): IType;
    validate(context: Context, jsxProp: JsxProperty): boolean;
}
