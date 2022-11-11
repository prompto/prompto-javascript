import BaseStatement from './BaseStatement';
import { IType } from '../type';
import { IValue } from '../value';
import { Context, Transpiler } from '../runtime';
import { Section } from "../parser";
import { StatementList } from "../statement";
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
export default class WhileStatement extends BaseStatement {
    condition: IExpression;
    statements: StatementList | null;
    constructor(condition: IExpression, statements: StatementList | null);
    locateSectionAtLine(line: number): Section;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    interpretCondition(context: Context): boolean;
    toDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    canReturn(): boolean;
}
