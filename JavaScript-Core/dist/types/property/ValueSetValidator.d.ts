import PropertyValidator from './PropertyValidator';
import { AnyType } from '../type';
import { Context } from "../runtime";
import { JsxProperty } from "../jsx";
export default class ValueSetValidator extends PropertyValidator {
    values: Set<string>;
    constructor(values: Set<string>);
    toString(): string;
    getType(context: Context): AnyType;
    validate(context: Context, jsxProp: JsxProperty): boolean;
}
