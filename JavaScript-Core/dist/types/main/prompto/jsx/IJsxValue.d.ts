import { IType, MethodType } from "../type";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default interface IJsxValue {
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    checkProto(context: Context, proto: MethodType): IType;
    declareProto(transpiler: Transpiler, proto: MethodType): void;
    transpileProto(transpiler: Transpiler, proto: MethodType): void;
    isLiteral(): boolean;
    toDialect(writer: CodeWriter): void;
}
