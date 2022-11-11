import NativeType from './NativeType';
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import IType from "./IType";
import { IExpression } from "../expression";
export default class CssType extends NativeType {
    static instance: CssType;
    constructor();
    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareAdd(transpiler: Transpiler): void;
    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
}
