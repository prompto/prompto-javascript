import { IType } from '../type';
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { Section } from "../parser";
export default class RangeLiteral extends Section {
    first: IExpression;
    last: IExpression;
    constructor(first: IExpression, last: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpret(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
