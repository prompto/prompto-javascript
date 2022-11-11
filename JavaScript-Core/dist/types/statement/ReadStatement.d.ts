import ReadAllExpression from '../expression/ReadAllExpression';
import { IType } from '../type';
import { IExpression } from "../expression";
import { ThenWith } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class ReadStatement extends ReadAllExpression {
    thenWith: ThenWith;
    constructor(source: IExpression, thenWith: ThenWith);
    locateSectionAtLine(line: number): Section | null;
    canReturn(): boolean;
    isSimple(): boolean;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue | null;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
