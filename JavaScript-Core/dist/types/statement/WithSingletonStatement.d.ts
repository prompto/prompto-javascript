import BaseStatement from './BaseStatement';
import { StatementList } from "../statement";
import { CategoryType, IType } from "../type";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class WithSingletonStatement extends BaseStatement {
    type: CategoryType;
    statements: StatementList | null;
    constructor(type: CategoryType, statements: StatementList | null);
    locateSectionAtLine(line: number): import("..").Section;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
}
