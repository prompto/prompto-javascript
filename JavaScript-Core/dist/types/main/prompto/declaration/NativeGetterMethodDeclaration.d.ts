import GetterMethodDeclaration from './GetterMethodDeclaration';
import { Identifier } from "../grammar";
import { StatementList } from "../statement";
import { Context } from "../runtime";
import { IValue } from "../value";
export default class NativeGetterMethodDeclaration extends GetterMethodDeclaration {
    constructor(id: Identifier, statements: StatementList);
    interpret(context: Context): IValue | null;
}
