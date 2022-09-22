import AbstractMethodDeclaration from './AbstractMethodDeclaration'
import {ClosureValue, Value} from "../value";
import {Context} from "../runtime";

export default class ClosureDeclaration extends AbstractMethodDeclaration {

    closure: ClosureValue;

    constructor(closure: ClosureValue) {
        super(
            closure.value.method.id,
            closure.value.method.parameters,
            closure.value.method.returnType
        );
        this.closure = closure;
    }

    interpret(context: Context): Value {
        return this.closure.interpret(context);
    }
}
