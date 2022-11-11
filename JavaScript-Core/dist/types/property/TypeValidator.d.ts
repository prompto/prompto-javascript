import PropertyValidator from './PropertyValidator';
import { IType } from '../type';
import { Context, Transpiler } from '../runtime';
import { JsxProperty } from "../jsx";
import { IMethodDeclaration } from "../declaration";
export default class TypeValidator extends PropertyValidator {
    type: IType;
    constructor(type: IType);
    toString(): string;
    getType(context: Context): IType;
    validate(context: Context, jsxProp: JsxProperty): boolean;
    declare(transpiler: Transpiler, jsxProp: JsxProperty): void;
    transpile(transpiler: Transpiler, jsxProp: JsxProperty): void;
    getMethodDeclarations(context: Context): Set<IMethodDeclaration>;
}
