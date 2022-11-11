import BaseExpression from './BaseExpression';
import { IValue } from '../value';
import { Identifier } from "../grammar";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IType } from "../type";
export default class ExecuteExpression extends BaseExpression {
    id: Identifier;
    constructor(id: Identifier);
    get name(): string;
    toString(): string;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    private getCodeValue;
}
