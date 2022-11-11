import ConcreteCategoryDeclaration from './ConcreteCategoryDeclaration';
import { ConcreteMethodDeclaration, IMethodDeclaration } from '../declaration';
import { Context, Transpiler } from '../runtime';
import { Identifier, IdentifierList } from "../grammar";
import { CodeWriter } from "../utils";
export default class SingletonCategoryDeclaration extends ConcreteCategoryDeclaration {
    constructor(id: Identifier, attributes: IdentifierList, methods: IMethodDeclaration[]);
    categoryTypetoEDialect(writer: CodeWriter): void;
    categoryTypetoODialect(writer: CodeWriter): void;
    categoryTypetoMDialect(writer: CodeWriter): void;
    getInitializeMethod(context: Context): ConcreteMethodDeclaration | null;
    transpile(transpiler: Transpiler): void;
}
