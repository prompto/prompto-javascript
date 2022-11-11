import BaseStatement from './BaseStatement';
import { AssignVariableStatement, StatementList } from "./index";
import { Section } from "../parser";
import { Context, Transpiler } from "../runtime";
import { IType } from "../type";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class WithResourceStatement extends BaseStatement {
    resource: AssignVariableStatement;
    statements: StatementList | null;
    constructor(resource: AssignVariableStatement, statements: StatementList | null);
    locateSectionAtLine(line: number): Section | null;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
}
