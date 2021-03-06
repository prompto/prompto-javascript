import AbstractMethodDeclaration from './AbstractMethodDeclaration.js'

export default class ArrowDeclaration extends AbstractMethodDeclaration {

    constructor(arrow) {
        super(arrow.method.id, arrow.method.parameters, arrow.method.returnType);
        this.arrow = arrow;
    }

    interpret(context) {
        return this.arrow.interpret(context);
    }
}

