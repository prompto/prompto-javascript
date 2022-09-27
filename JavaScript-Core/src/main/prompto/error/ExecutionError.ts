import PromptoError from './PromptoError';
import {Context, ErrorVariable} from "../runtime";
import {Argument, ArgumentList, Identifier} from "../grammar";
import {UnresolvedParameter} from "../param";
import {TextLiteral} from "../literal";
import {ConstructorExpression} from "../expression";
import {CategoryType} from "../type";
import {IValue} from "../value";


export default abstract class ExecutionError extends PromptoError {

    constructor(message: string) {
        super(message);
    }

    interpret(context: Context, errorName: Identifier): IValue {
       let exp = this.getExpression(context);
        if (!exp) {
            const args = new ArgumentList();
            args.add(new Argument(new UnresolvedParameter(new Identifier("name")), new TextLiteral('"' + this.name + '"')));
            args.add(new Argument(new UnresolvedParameter(new Identifier("text")), new TextLiteral('"' + this.message + '"')));
            exp = new ConstructorExpression(new CategoryType("Error"), args, null);
        }
        if (context.getRegisteredInstance(errorName) == null)
            context.registerInstance(new ErrorVariable(errorName), false);
        const error = exp.interpret(context);
        context.setValue(errorName, error);
        return error;
    }
}
