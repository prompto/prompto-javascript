import BaseParameter from './BaseParameter';
import { IType, MethodType } from '../type';
import { ArrowValue, ContextualExpression } from '../value';
import { IExpression } from '../expression';
import { Identifier } from "../grammar";
import { Dialect } from "../parser";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { IParameter } from "./index";
export default class MethodParameter extends BaseParameter {
    constructor(id: Identifier);
    getSignature(dialect: Dialect): string;
    toString(): string;
    getProto(): string;
    register(context: Context): void;
    check(context: Context): IType;
    checkValue(context: Context, expression: IExpression): import("../value").IValue;
    checkArrowValue(context: Context, expression: ContextualExpression): ArrowValue;
    getType(context: Context): MethodType;
    getDeclaration(context: Context): import("../declaration").IMethodDeclaration;
    declare(transpiler: Transpiler): void;
    getTranspiledName(context: Context): string;
    transpileCall(transpiler: Transpiler, expression: IExpression): void;
    transpileArrowExpressionCall(transpiler: Transpiler, expression: IExpression): boolean;
    equals(other: IParameter): boolean;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
