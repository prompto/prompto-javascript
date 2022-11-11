import FetchManyExpression from '../expression/FetchManyExpression';
import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import { IExpression } from "../expression";
import { IdentifierList, OrderByClauseList, ThenWith } from "../grammar";
import { Section } from "../parser";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class FetchManyStatement extends FetchManyExpression {
    thenWith: ThenWith;
    constructor(type: IType | null, first: IExpression | null, last: IExpression | null, predicate: IExpression | null, include: IdentifierList | null, orderBy: OrderByClauseList | null, thenWith: ThenWith);
    locateSectionAtLine(line: number): Section | null;
    canReturn(): boolean;
    isSimple(): boolean;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
