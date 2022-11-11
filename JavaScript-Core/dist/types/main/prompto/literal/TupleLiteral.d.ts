import Literal from './Literal';
import { IType } from '../type';
import { IValue, TupleValue } from '../value';
import { ExpressionList } from '../expression';
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class TupleLiteral extends Literal<TupleValue> {
    mutable: boolean;
    expressions: ExpressionList;
    constructor(mutable: boolean, expressions: ExpressionList | null);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    interpretExpression(context: Context): IValue;
    toDialect(writer: CodeWriter): void;
}
