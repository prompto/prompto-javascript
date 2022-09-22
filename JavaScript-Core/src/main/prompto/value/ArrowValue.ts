import ContextualExpression from './ContextualExpression'
import {MethodDeclaration} from "../declaration";
import {Context} from "../runtime";
import {ArrowExpression} from "../expression";
import Value from "./Value";

export default class ArrowValue extends ContextualExpression {

    method: MethodDeclaration;

    constructor(method: MethodDeclaration, calling: Context, expression: ArrowExpression) {
        super(calling, expression);
        this.method = method;
    }

    interpret(context: Context): Value {
        const parent = context.getParentContext();
        try {
            context.setParentContext(this.calling);
            return this.expression.interpret(context);
        } finally {
            context.setParentContext(parent);
        }
    }
}

