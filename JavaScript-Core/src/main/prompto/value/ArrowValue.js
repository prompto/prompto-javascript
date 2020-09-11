import ContextualExpression from "./ContextualExpression"

export default class ArrowValue extends ContextualExpression {

    constructor(method, calling, arrow) {
        super(calling, arrow);
        this.method = method;
    }

    interpret(context) {
        const parent = context.getParentContext();
        try {
            context.setParentContext(this.calling);
            return this.expression.interpret(context);
        } finally {
            context.setParentContext(parent);
        }
    }
}

