import BaseStatement from './BaseStatement';
import { IType } from '../type';
import { Section } from '../parser';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
export default class CommentStatement extends BaseStatement {
    text: string;
    constructor(text: string);
    locateSectionAtLine(line: number): Section | null;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
}
