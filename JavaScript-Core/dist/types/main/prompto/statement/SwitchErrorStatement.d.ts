import BaseSwitchStatement from './BaseSwitchStatement';
import { Identifier } from '../grammar';
import { EnumeratedCategoryType, TypeMap } from '../type';
import { Context, Transpiler } from '../runtime';
import { ExecutionError } from '../error';
import { StatementList, SwitchCaseList } from "../statement";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class SwitchErrorStatement extends BaseSwitchStatement {
    errorId: Identifier;
    statements: StatementList;
    alwaysInstructions: StatementList | null;
    constructor(errorId: Identifier, statements: StatementList, handlers: SwitchCaseList, anyStmts: StatementList | null, alwaysStmts: StatementList | null);
    locateSectionAtLine(line: number): import("../parser").Section;
    checkSwitchCasesType(context: Context): void;
    checkSwitchType(context: Context): EnumeratedCategoryType;
    collectReturnTypes(context: Context, types: TypeMap): import("../parser").Section;
    interpretStatement(context: Context): IValue | null;
    populateError(e: ExecutionError, context: Context): IValue;
    toDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
