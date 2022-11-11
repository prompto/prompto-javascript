import SimpleStatement from './SimpleStatement';
import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import { CodeWriter } from "../utils";
import { IValue } from "../value";
export default class BreakStatement extends SimpleStatement {
    toString(): string;
    toDialect(writer: CodeWriter): void;
    equals(obj: any): boolean;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    canReturn(): boolean;
}
