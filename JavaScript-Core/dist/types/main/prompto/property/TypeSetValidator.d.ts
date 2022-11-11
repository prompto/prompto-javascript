import PropertyValidator from './PropertyValidator';
import { AnyType, IType } from '../type';
import { Context } from '../runtime';
import { JsxProperty } from "../jsx";
import { IMethodDeclaration } from "../declaration";
export default class TypeSetValidator extends PropertyValidator {
    types: Set<IType>;
    constructor(types: Set<IType>);
    toString(): string;
    getType(context: Context): AnyType;
    validate(context: Context, jsxProp: JsxProperty): boolean;
    getMethodDeclarations(context: Context): Set<IMethodDeclaration>;
}
