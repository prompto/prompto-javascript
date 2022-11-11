import BaseParameter from './BaseParameter';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { Dialect } from "../parser";
import { IType } from "../type";
import { IExpression } from "../expression";
import { IParameter } from "./index";
import { CodeWriter } from '../utils';
import { IValue } from "../value";
export default class AttributeParameter extends BaseParameter {
    constructor(id: Identifier, mutable: boolean);
    toString(): string;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    getProto(): string;
    getSignature(dialect: Dialect): string;
    getTranspiledName(context: Context): string;
    register(context: Context): void;
    check(context: Context): IType;
    getType(context: Context): IType;
    checkValue(context: Context, value: IExpression): IValue;
    declare(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, expression: IExpression): void;
    equals(other: IParameter): boolean;
}
