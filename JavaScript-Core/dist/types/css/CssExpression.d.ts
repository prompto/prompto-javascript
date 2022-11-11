import { IType } from '../type';
import { IValue } from '../value';
import { CssField } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import ICssValue from "./ICssValue";
export default class CssExpression implements ICssValue {
    fields: CssField[];
    constructor(fields: CssField[]);
    toString(): string;
    check(context: Context): IType;
    interpret(context: Context): IValue;
    toDialect(writer: CodeWriter): void;
    addField(field: CssField): void;
    plus(expression: CssExpression): CssExpression;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
