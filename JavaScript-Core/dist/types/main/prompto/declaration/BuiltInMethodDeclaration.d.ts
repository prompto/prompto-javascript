import BaseMethodDeclaration from './BaseMethodDeclaration';
import { IParameter } from '../param';
import { Context, Transpiler } from '../runtime';
import { ArgumentList } from "../grammar";
import { IValue } from "../value";
import { IMethodInfo } from "../runtime/Catalog";
import { IType } from "../type";
import { CodeWriter } from "../utils";
export default abstract class BuiltInMethodDeclaration<T extends IValue> extends BaseMethodDeclaration {
    constructor(name: string, ...args: IParameter[]);
    getValue(context: Context): T;
    checkChild(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareCall(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
    toDeclarationInfo(context: Context): IMethodInfo;
    getType(): IType;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
