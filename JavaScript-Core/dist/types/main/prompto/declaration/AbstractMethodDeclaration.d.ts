import BaseMethodDeclaration from './BaseMethodDeclaration';
import { IType } from '../type';
import { Identifier } from "../grammar";
import { ParameterList } from "../param";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class AbstractMethodDeclaration extends BaseMethodDeclaration {
    constructor(id: Identifier, parameters: ParameterList, returnType?: IType | null);
    isAbstract(): boolean;
    getType(context: Context): IType;
    interpret(context: Context): IValue;
    check(context: Context, isStart: boolean): IType;
    checkChild(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toMDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
