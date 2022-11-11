import NativeCategoryDeclaration from './NativeCategoryDeclaration';
import { ResourceType } from '../type';
import { NativeResource } from '../value';
import { Context } from '../runtime';
import { Identifier, IdentifierList, NativeCategoryBindingList } from "../grammar";
import { IMethodDeclaration } from "./index";
import { CodeWriter } from "../utils";
export default class NativeResourceDeclaration extends NativeCategoryDeclaration {
    constructor(id: Identifier, attributes: IdentifierList, categoryBindings: NativeCategoryBindingList, attributeBindings: any, methods: IMethodDeclaration[]);
    getType(context: Context): ResourceType;
    newInstance(context: Context): NativeResource;
    checkConstructorContext(context: Context): void;
    categoryTypeToEDialect(writer: CodeWriter): void;
    categoryTypeToODialect(writer: CodeWriter): void;
    categoryTypeToMDialect(writer: CodeWriter): void;
}
