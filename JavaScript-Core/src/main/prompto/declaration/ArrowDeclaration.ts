import AbstractMethodDeclaration from './AbstractMethodDeclaration'
import {Context} from "../runtime";
import {ArrowValue, Value} from "../value";

export default class ArrowDeclaration extends AbstractMethodDeclaration {

    arrow: ArrowValue;

    constructor(arrow: ArrowValue) {
        super(arrow.method.id, arrow.method.parameters, arrow.method.returnType);
        this.arrow = arrow;
    }

    interpret(context: Context): Value {
        return this.arrow.interpret(context);
    }
}

