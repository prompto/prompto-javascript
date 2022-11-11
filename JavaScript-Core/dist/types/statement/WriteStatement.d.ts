import BaseStatement from './BaseStatement';
import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import { IValue } from '../value';
import { ThenWith } from "../grammar";
import { IExpression } from "../expression";
import { Section } from "../parser";
import { CodeWriter } from "../utils";
export default class WriteStatement extends BaseStatement {
    content: IExpression;
    resource: IExpression;
    thenWith: ThenWith | null;
    constructor(content: IExpression, resource: IExpression, thenWith: ThenWith | null);
    locateSectionAtLine(line: number): Section | null;
    isSimple(): boolean;
    toString(): string;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileLine(transpiler: Transpiler): void;
    transpileFully(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
}
