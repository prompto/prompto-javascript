import ConcreteCategoryDeclaration from './ConcreteCategoryDeclaration';
import { Identifier } from '../grammar';
import { IMethodDeclaration, IWidgetDeclaration } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { PropertyMap } from "../property";
import { IWidgetInfo } from "../runtime/Catalog";
export default class ConcreteWidgetDeclaration extends ConcreteCategoryDeclaration implements IWidgetDeclaration {
    properties?: PropertyMap | null;
    constructor(id: Identifier, derivedFrom: Identifier | null, methods: IMethodDeclaration[] | null);
    isWidget(context: Context): boolean;
    toDeclarationInfo(): IWidgetInfo;
    getProperties(context: Context): PropertyMap | null;
    getDeclarationType(): string;
    categoryTypeToEDialect(writer: CodeWriter): void;
    categoryTypeToODialect(writer: CodeWriter): void;
    categoryTypeToMDialect(writer: CodeWriter): void;
    declareRoot(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileRootConstructor(transpiler: Transpiler): Transpiler;
}
