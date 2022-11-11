import { IType, MethodType, VoidType } from '../type';
import IJsxValue from "./IJsxValue";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class JsxLiteral implements IJsxValue {
    text: string;
    constructor(text: string);
    check(context: Context): IType;
    checkProto(context: Context, proto: MethodType): VoidType;
    toString(): string;
    isLiteral(): boolean;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareProto(transpiler: Transpiler, proto: MethodType): void;
    transpileProto(transpiler: Transpiler, proto: MethodType): void;
}
