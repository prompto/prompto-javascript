import SimpleStatement from './SimpleStatement';
import { IType } from '../type';
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class FlushStatement extends SimpleStatement {
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
