const AbstractMethodDeclaration = require("./AbstractMethodDeclaration").AbstractMethodDeclaration;

class ArrowDeclaration extends AbstractMethodDeclaration {
    constructor(arrow) {
        super(arrow.method.id, arrow.method.parameters, arrow.method.returnType);
        this.arrow = arrow;
        return this;
    }

    interpret(context) {
        return this.arrow.interpret(context);
    }
}

exports.ArrowDeclaration = ArrowDeclaration;
