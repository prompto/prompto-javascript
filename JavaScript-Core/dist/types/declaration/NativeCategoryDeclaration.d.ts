import ConcreteCategoryDeclaration from './ConcreteCategoryDeclaration';
import { CodeWriter } from '../utils';
import { NativeInstance } from '../value';
import { JavaScriptNativeCategoryBinding } from '../javascript';
import { Context, Transpiler } from "../runtime";
import { Identifier, IdentifierList, NativeCategoryBindingList } from "../grammar";
import { IMethodDeclaration } from "./index";
import { Section } from "../parser";
export default class NativeCategoryDeclaration extends ConcreteCategoryDeclaration {
    categoryBindings: NativeCategoryBindingList;
    bound?: (() => any) | null;
    constructor(id: Identifier, attributes: IdentifierList | null, categoryBindings: NativeCategoryBindingList, attributeBindings: any, methods: IMethodDeclaration[] | null);
    register(context: Context): void;
    toEDialect(writer: CodeWriter): void;
    categoryTypeToEDialect(writer: CodeWriter): void;
    bindingsToEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    categoryTypeToODialect(writer: CodeWriter): void;
    bodyToODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    categoryTypeToMDialect(writer: CodeWriter): void;
    newInstance(context: Context): NativeInstance;
    getBoundFunction(fail: boolean): (() => any) | null;
    getBinding(fail: boolean): JavaScriptNativeCategoryBinding | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    locateSectionAtLine(line: number): Section | null;
}
