import BaseExpression from './BaseExpression';
import { IExpression } from './index';
import { IType } from '../type';
import { IValue } from '../value';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
export default class SortedExpression extends BaseExpression {
    source: IExpression;
    descending: boolean;
    key: IExpression | null;
    constructor(source: IExpression, descending: boolean, key: IExpression | null);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    getItemType(context: Context): IType;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    contextualizeWriter(writer: CodeWriter, itemType: IType): CodeWriter;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    asSection(): Section;
}
