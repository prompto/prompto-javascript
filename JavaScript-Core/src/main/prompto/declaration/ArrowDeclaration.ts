import AbstractMethodDeclaration from './AbstractMethodDeclaration'
import {Context} from "../runtime";
import {ArrowValue, IValue} from "../value";

export default class ArrowDeclaration extends AbstractMethodDeclaration {

    arrow: ArrowValue;

    constructor(arrow: ArrowValue) {
        super(arrow.method.id, arrow.method.parameters, arrow.method.returnType);
        this.arrow = arrow;
    }

    interpret(context: Context): IValue {
        return this.arrow.interpret(context);
    }
}

