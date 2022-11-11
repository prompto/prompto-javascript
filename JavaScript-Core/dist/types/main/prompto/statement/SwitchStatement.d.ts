import BaseSwitchStatement from './BaseSwitchStatement';
import { StatementList, SwitchCaseList } from "../statement";
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class SwitchStatement extends BaseSwitchStatement {
    expression: IExpression;
    constructor(expression: IExpression, switchCases: SwitchCaseList, defaultCase: StatementList | null);
    canReturn(): boolean;
    locateSectionAtLine(line: number): Section | null;
    checkSwitchType(context: Context): import("../type").IType;
    interpretStatement(context: Context): IValue | null;
    toODialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
