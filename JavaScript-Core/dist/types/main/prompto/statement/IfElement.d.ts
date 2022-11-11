import BaseStatement from "./BaseStatement";
import { StatementList } from "./index";
import { Section } from "../parser";
import { IType } from "../type";
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class IfElement extends BaseStatement {
    condition: IExpression | null;
    statements: StatementList;
    constructor(condition: IExpression | null, statements: StatementList);
    locateSectionAtLine(line: number): Section;
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    downcast(context: Context, setValue: boolean): Context;
    interpretStatement(context: Context): IValue | null;
    toMDialect(writer: CodeWriter): boolean;
    toEDialect(writer: CodeWriter): boolean;
    toODialect(writer: CodeWriter): boolean;
    needsCurlyBraces(): boolean;
    toDialect(writer: CodeWriter): void;
}
