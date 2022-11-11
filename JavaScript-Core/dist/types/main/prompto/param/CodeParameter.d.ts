import BaseParameter from './BaseParameter';
import { IType } from '../type';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { Dialect } from "../parser";
import { IParameter } from "./index";
export default class CodeParameter extends BaseParameter {
    constructor(id: Identifier);
    getProto(): string;
    register(context: Context): void;
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    getType(context: Context): IType;
    toDialect(writer: CodeWriter): void;
    equals(other: IParameter): boolean;
    getSignature(dialect: Dialect): string;
    getTranspiledName(context: Context): string;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
