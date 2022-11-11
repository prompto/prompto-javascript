import NativeType from './NativeType';
import { CmpOp, Identifier } from '../grammar';
import { IValue } from '../value';
import { Context, Transpiler } from "../runtime";
import IType from "./IType";
import { Section } from "../parser";
import { IExpression } from "../expression";
export default class DateTimeType extends NativeType {
    static instance: DateTimeType;
    constructor();
    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue;
    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    checkSubtract(context: Context, section: Section, other: IType): IType;
    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    checkCompare(context: Context, section: Section, other: IType): IType;
    declareCompare(transpiler: Transpiler, other: IType): void;
    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void;
    checkMember(context: Context, section: Section, id: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, id: Identifier): void;
    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void;
}
