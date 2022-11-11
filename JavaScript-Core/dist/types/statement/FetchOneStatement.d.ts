import FetchOneExpression from '../expression/FetchOneExpression';
import { Context, Transpiler } from '../runtime';
import { IType } from "../type";
import { IExpression } from "../expression";
import { IdentifierList, ThenWith } from "../grammar";
import { Section } from "../parser";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class FetchOneStatement extends FetchOneExpression {
    thenWith: ThenWith;
    constructor(type: IType, predicate: IExpression, include: IdentifierList | null, thenWith: ThenWith);
    locateSectionAtLine(line: number): Section | null;
    canReturn(): boolean;
    isSimple(): boolean;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue | null;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
