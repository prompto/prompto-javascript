import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IExpression, PredicateExpression } from "./index";
import { CodeWriter } from "../utils";
import { Dialect } from "../parser";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
export default class FilteredExpression extends BaseExpression {
    source: IExpression | null;
    predicate: PredicateExpression;
    constructor(source: IExpression | null, predicate: PredicateExpression);
    toString(dialect?: Dialect): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    private filter;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
