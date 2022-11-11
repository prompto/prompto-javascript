import SetterMethodDeclaration from './SetterMethodDeclaration';
import { Identifier } from "../grammar";
import { StatementList } from "../statement";
export default class NativeSetterMethodDeclaration extends SetterMethodDeclaration {
    constructor(id: Identifier, statements: StatementList);
}
