import SimpleStatement from './SimpleStatement';
import { IType } from '../type';
import { IValue } from '../value';
import { Context, Transpiler } from '../runtime';
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
export default class ReturnStatement extends SimpleStatement {
    expression: IExpression | null;
    fromArrowExpression: boolean;
    constructor(expression: IExpression | null, fromArrowExpression?: boolean);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    equals(obj: any): boolean;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue;
    canReturn(): boolean;
}
