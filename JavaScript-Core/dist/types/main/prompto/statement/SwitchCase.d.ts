import Section from '../parser/Section';
import { StatementList } from "../statement";
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { IType } from "../type";
import { CodeWriter } from "../utils";
export default abstract class SwitchCase extends Section {
    expression: IExpression | null;
    statements: StatementList;
    constructor(expression: IExpression | null, statements: StatementList);
    locateSectionAtLine(line: number, checkExpression?: boolean): Section | null;
    abstract checkSwitchType(context: Context, type: IType): void;
    checkReturnType(context: Context): IType;
    interpret(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    abstract transpile(transpiler: Transpiler): void;
    transpileError(child: Transpiler): void;
    abstract matches(context: Context, switchValue: IValue): boolean;
    abstract caseToEDialect(writer: CodeWriter): void;
    abstract caseToMDialect(writer: CodeWriter): void;
    abstract caseToODialect(writer: CodeWriter): void;
    abstract catchToEDialect(writer: CodeWriter): void;
    abstract catchToMDialect(writer: CodeWriter): void;
    abstract catchToODialect(writer: CodeWriter): void;
}
