import BaseExpression from './BaseExpression';
import { IAssertion, IExpression, IPredicate } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IType } from "../type";
import { IValue } from "../value";
import { IQueryBuilder } from "../store";
import { Dialect } from "../parser";
import { TestMethodDeclaration } from "../declaration";
export default class ParenthesisExpression extends BaseExpression implements IPredicate, IAssertion {
    expression: IExpression;
    constructor(expression: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    checkQuery(context: Context): void;
    interpretQuery(context: Context, query: IQueryBuilder): void;
    declareQuery(transpiler: Transpiler): void;
    transpileQuery(transpiler: Transpiler, builderName: string): void;
    checkAssert(context: Context): Context;
    getExpected(context: Context, dialect: Dialect, escapeMode: number): string;
    interpretAssert(context: Context, method: TestMethodDeclaration): boolean;
    transpileFound(transpiler: Transpiler, dialect: Dialect): void;
}
