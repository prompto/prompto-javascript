import BaseStatement from './BaseStatement';
import { IfElementList, StatementList } from '../statement';
import { IType } from '../type';
import { IValue } from '../value';
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import { CodeWriter } from "../utils";
export default class IfStatement extends BaseStatement {
    condition: IExpression;
    statements: StatementList;
    elements: IfElementList;
    constructor(condition: IExpression, statements: StatementList, elseIfs: IfElementList | null, elseStmts: StatementList | null);
    locateSectionAtLine(line: number): Section | null;
    addAdditional(condition: IExpression, statements: StatementList): void;
    setFinal(statements: StatementList): void;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    canReturn(): boolean;
}
