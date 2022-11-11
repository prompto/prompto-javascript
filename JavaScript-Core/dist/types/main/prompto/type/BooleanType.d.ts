import NativeType from './NativeType';
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import IType from "./IType";
import { IExpression } from "../expression";
export default class BooleanType extends NativeType {
    static instance: BooleanType;
    constructor();
    checkAnd(context: Context, section: Section, other: IType): IType;
    checkOr(context: Context, section: Section, other: IType): IType;
    checkNot(context: Context, section: Section): IType;
    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType): import("../value").IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileSorted(transpiler: Transpiler, desc: boolean, key: IExpression): void;
}
