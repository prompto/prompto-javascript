import PropertyValidator from "./PropertyValidator";
import { AnyType } from "../type";
import { Context } from "../runtime";
import { JsxProperty } from "../jsx";
export default class ValidatorSetValidator extends PropertyValidator {
    validators: PropertyValidator[];
    constructor(validators: PropertyValidator[]);
    getType(context: Context): AnyType;
    validate(context: Context, jsxProp: JsxProperty): boolean;
}
