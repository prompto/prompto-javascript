import PromptoError from './PromptoError.js';
import { ErrorVariable } from "../runtime/index.ts";
import { Argument, ArgumentList, Identifier } from "../grammar/index.ts";
import { UnresolvedParameter } from "../param/index.ts";
import { TextLiteral } from "../literal/index.ts";
import { ConstructorExpression } from "../expression/index.ts";
import { CategoryType } from "../type/index.ts";

export default class ExecutionError extends PromptoError {
    constructor(message) {
        super(message);
    }
    interpret(context, errorName) {
        let exp = this.getExpression(context);
        if (!exp) {
            const args = new ArgumentList();
            args.add(new Argument(new UnresolvedParameter(new Identifier("name")), new TextLiteral('"' + this.name + '"')));
            args.add(new Argument(new UnresolvedParameter(new Identifier("text")), new TextLiteral('"' + this.message + '"')));
            exp = new ConstructorExpression(new CategoryType(new Identifier("Error")), null, args);
        }
        if (context.getRegisteredInstance(errorName) == null)
            context.registerInstance(new ErrorVariable(errorName), false);
        const error = exp.interpretExpression(context);
        context.setValue(errorName, error);
        return error;
    }
}
