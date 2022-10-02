import ContextualExpression from './ContextualExpression'
import {IMethodDeclaration} from "../declaration";
import {Context} from "../runtime";
import {ArrowExpression} from "../expression";
import IValue from "./IValue";

export default class ArrowValue extends ContextualExpression {

    method: IMethodDeclaration;

    constructor(method: IMethodDeclaration, calling: Context, expression: ArrowExpression) {
        super(calling, expression);
        this.method = method;
    }

    interpretExpression(context: Context): IValue {
        const parent = context.getParentContext();
        try {
            context.setParentContext(this.calling);
            return this.expression.interpretExpression(context);
        } finally {
            if(parent)
                context.setParentContext(parent);
        }
    }
}

