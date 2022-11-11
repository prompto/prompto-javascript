import ObjectList from '../utils/ObjectList';
import { Argument, Identifier } from './index';
import { Context, Transpiler } from "../runtime";
import { IMethodDeclaration } from "../declaration";
import { CodeWriter } from "../utils";
export default class ArgumentList extends ObjectList<Argument> {
    constructor(items?: Argument[], item?: Argument);
    checkLastAnd(): void;
    findIndexById(id: Identifier): number;
    findIndexByName(name: string): number;
    findById(id: Identifier): Argument | null;
    findByName(name: string): Argument | null;
    makeArguments(context: Context, declaration: IMethodDeclaration): ArgumentList;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler, methodDeclaration: IMethodDeclaration | null): void;
    transpile(transpiler: Transpiler): void;
}
