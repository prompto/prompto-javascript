var AbstractMethodDeclaration = require("./AbstractMethodDeclaration").AbstractMethodDeclaration;

class ClosureDeclaration extends AbstractMethodDeclaration {
    constructor(closure) {
        super(
            closure.type.method.id,
            closure.type.method.parameters,
            closure.type.method.returnType
        );
        this.closure = closure;
        return this;
    }

    interpret(context) {
        return this.closure.interpret(context);
    }
}

exports.ClosureDeclaration = ClosureDeclaration;
