import NativeType from './NativeType';
import { CmpOp, Identifier } from '../grammar';
import { IValue } from '../value';
import { Context, Transpiler } from "../runtime";
import IType from "./IType";
import { Section } from "../parser";
import { IExpression } from "../expression";
export default class VersionType extends NativeType {
    static instance: VersionType;
    constructor();
    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue;
    checkCompare(context: Context, section: Section, other: IType): IType;
    declareCompare(transpiler: Transpiler, other: IType): void;
    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void;
    checkMember(context: Context, section: Section, id: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, id: Identifier): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void;
}
