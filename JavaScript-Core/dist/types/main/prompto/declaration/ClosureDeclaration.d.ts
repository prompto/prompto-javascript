import AbstractMethodDeclaration from './AbstractMethodDeclaration';
import { ClosureValue, IValue } from "../value";
import { Context } from "../runtime";
export default class ClosureDeclaration extends AbstractMethodDeclaration {
    closure: ClosureValue;
    constructor(closure: ClosureValue);
    interpret(context: Context): IValue;
}
