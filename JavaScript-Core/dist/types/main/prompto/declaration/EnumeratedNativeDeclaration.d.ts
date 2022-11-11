import BaseDeclaration from './BaseDeclaration';
import { EnumeratedNativeType, IType } from '../type';
import { NativeSymbol } from "../expression";
import { Context, Transpiler } from "../runtime";
import { Identifier, NativeSymbolList } from "../grammar";
import { CodeWriter } from "../utils";
import { IEnumerationInfo } from "../runtime/Catalog";
export default class EnumeratedNativeDeclaration extends BaseDeclaration {
    type: EnumeratedNativeType;
    symbols: NativeSymbolList;
    constructor(id: Identifier, derivedFrom: IType, symbols?: NativeSymbolList);
    toDeclarationInfo(): IEnumerationInfo;
    getDeclarationType(): string;
    getSymbolByName(name: string): NativeSymbol;
    unregister(context: Context): void;
    toDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    register(context: Context): void;
    check(context: Context): IType;
    transpile(transpiler: Transpiler): void;
    getType(context: Context): IType;
    declare(transpiler: Transpiler): void;
}
