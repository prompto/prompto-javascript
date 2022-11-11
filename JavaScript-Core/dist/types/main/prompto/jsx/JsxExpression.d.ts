import { IExpression } from '../expression';
import { IType, MethodType } from '../type';
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import IJsxExpression from "./IJsxExpression";
import IJsxValue from "./IJsxValue";
export default class JsxExpression implements IJsxExpression, IJsxValue {
    expression: IExpression;
    constructor(expression: IExpression);
    check(context: Context): IType;
    checkProto(context: Context, proto: MethodType): IType;
    declareProto(transpiler: Transpiler, proto: MethodType): void;
    transpileProto(transpiler: Transpiler, proto: MethodType): void;
    isLiteral(): boolean;
    toString(): string;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
