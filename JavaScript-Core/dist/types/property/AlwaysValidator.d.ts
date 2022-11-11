import PropertyValidator from './PropertyValidator';
import { IType } from '../type';
import { Context } from "../runtime";
import { JsxProperty } from "../jsx";
export default class AlwaysValidator extends PropertyValidator {
    static instance: AlwaysValidator;
    getType(context: Context): IType;
    validate(context: Context, jsxProp: JsxProperty): boolean;
}
