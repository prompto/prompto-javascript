import ConcreteMethodDeclaration from './ConcreteMethodDeclaration';
import { Identifier } from "../grammar";
import { StatementList } from "../statement";
import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
export default class GetterMethodDeclaration extends ConcreteMethodDeclaration {
    constructor(id: Identifier, statements: StatementList);
    toODialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
}
