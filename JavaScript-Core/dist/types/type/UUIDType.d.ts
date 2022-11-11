import NativeType from './NativeType';
import { IValue } from '../value';
import { Context, Transpiler } from "../runtime";
import IType from "./IType";
import { IExpression } from "../expression";
export default class UUIDType extends NativeType {
    static instance: UUIDType;
    constructor();
    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void;
}
