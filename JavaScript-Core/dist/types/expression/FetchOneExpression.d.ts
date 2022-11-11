import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { Store } from '../store';
import { IValue } from '../value';
import { IdentifierList } from '../grammar';
import { IExpression } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import IQuery from "../store/IQuery";
export default class FetchOneExpression extends BaseExpression {
    type: IType | null;
    predicate: IExpression | null;
    include: IdentifierList | null;
    constructor(type: IType | null, predicate: IExpression | null, include: IdentifierList | null);
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileConvert(transpiler: Transpiler, varName: string): void;
    transpileQuery(transpiler: Transpiler): void;
    buildFetchOneQuery(context: Context, store: Store): IQuery;
}
