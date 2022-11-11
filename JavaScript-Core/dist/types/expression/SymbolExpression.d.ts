import BaseExpression from './BaseExpression';
import { IType } from "../type";
import { IValue } from "../value";
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class SymbolExpression extends BaseExpression {
    id: Identifier;
    constructor(id: Identifier);
    get name(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
