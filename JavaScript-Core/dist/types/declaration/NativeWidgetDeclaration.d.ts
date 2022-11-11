import NativeCategoryDeclaration from './NativeCategoryDeclaration';
import { Identifier, NativeCategoryBindingList } from "../grammar";
import { IMethodDeclaration } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { PropertyMap } from "../property";
import { IWidgetInfo } from "../runtime/Catalog";
export default class NativeWidgetDeclaration extends NativeCategoryDeclaration {
    properties?: PropertyMap | null;
    constructor(id: Identifier, categoryBindings: NativeCategoryBindingList, methods: IMethodDeclaration[] | null);
    isWidget(context: Context): boolean;
    toDeclarationInfo(): IWidgetInfo;
    getPageWidgetOf(): string | null;
    getProperties(context: Context): PropertyMap | null;
    getDeclarationType(): string;
    getBoundFunction(fail: boolean): (() => any) | null;
    categoryTypeToEDialect(writer: CodeWriter): void;
    categoryTypeToODialect(writer: CodeWriter): void;
    categoryTypeToMDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
}
