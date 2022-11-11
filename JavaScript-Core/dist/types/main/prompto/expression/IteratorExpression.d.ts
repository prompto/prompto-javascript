import BaseExpression from './BaseExpression';
import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import { IValue } from '../value';
import { Identifier } from "../grammar";
import IExpression from "../expression/IExpression";
import { CodeWriter } from "../utils";
import { IIterator } from "../intrinsic";
export default class IteratorExpression extends BaseExpression {
    id: Identifier;
    source: IExpression;
    expression: IExpression;
    constructor(id: Identifier, source: IExpression, expression: IExpression);
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    getIterator(context: Context, source: IValue): IIterator<IValue>;
    toDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    static encloseInParenthesisIfRequired(expression: IExpression): IExpression;
    static extractFromParenthesisIfPossible(expression: IExpression): IExpression;
    static mustBeEnclosedInParenthesis(expression: IExpression): boolean;
}
