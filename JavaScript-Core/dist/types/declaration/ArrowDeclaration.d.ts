import AbstractMethodDeclaration from './AbstractMethodDeclaration';
import { Context } from "../runtime";
import { ArrowValue, IValue } from "../value";
export default class ArrowDeclaration extends AbstractMethodDeclaration {
    arrow: ArrowValue;
    constructor(arrow: ArrowValue);
    interpret(context: Context): IValue;
}
