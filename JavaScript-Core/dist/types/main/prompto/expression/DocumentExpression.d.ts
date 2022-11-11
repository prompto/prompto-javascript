import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { DocumentValue, BlobValue, IValue } from '../value';
import { IExpression } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class DocumentExpression extends BaseExpression {
    source: IExpression | null;
    constructor(source: IExpression | null);
    check(context: Context): IType;
    toString(context: Context): string;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    documentFromValue(context: Context, value: IValue): DocumentValue;
    documentFromBlob(context: Context, blob: BlobValue): DocumentValue;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
