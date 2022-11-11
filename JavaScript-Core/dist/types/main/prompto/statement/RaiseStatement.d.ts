import SimpleStatement from './SimpleStatement';
import { IType } from '../type';
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class RaiseStatement extends SimpleStatement {
    expression: IExpression;
    constructor(expression: IExpression);
    toString(): string;
    equals(obj: any): boolean;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
}
