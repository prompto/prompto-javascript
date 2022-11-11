import BaseStatement from './BaseStatement';
import { IType } from '../type';
import { IValue } from '../value';
import { IDeclaration } from '../declaration';
import { Context, Transpiler } from '../runtime';
import { CodeWriter, IWritable } from "../utils";
export default class DeclarationStatement<D extends IDeclaration> extends BaseStatement implements IWritable {
    declaration: D;
    constructor(declaration: D);
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
