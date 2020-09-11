import AbstractMethodDeclaration from "./AbstractMethodDeclaration"

export default class ClosureDeclaration extends AbstractMethodDeclaration {

    constructor(closure) {
        super(
            closure.type.method.id,
            closure.type.method.parameters,
            closure.type.method.returnType
        );
        this.closure = closure;
    }

    interpret(context) {
        return this.closure.interpret(context);
    }
}
