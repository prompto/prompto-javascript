import PromptoError from "./PromptoError"
import { ErrorVariable } from "../runtime/index"
import { ArgumentList, Argument } from "../grammar/index"
import { UnresolvedParameter } from "../param/index"
import { TextLiteral } from "../literal/index"
import { ConstructorExpression } from "../expression/index"
import { CategoryType } from "../type/index"

export default function ExecutionError(message) {
	PromptoError.call(this, message);
	return this;
}

ExecutionError.prototype = Object.create(PromptoError.prototype);
ExecutionError.prototype.constructor = ExecutionError;

ExecutionError.prototype.interpret = function(context, errorName) {
    var exp = this.getExpression(context);
    if(exp==null) {
        var args = new ArgumentList();
        args.add(new Argument(new UnresolvedParameter("name"), new TextLiteral('"' + this.name + '"')));
        args.add(new Argument(new UnresolvedParameter("text"), new TextLiteral('"' + this.message + '"')));
        exp = new ConstructorExpression(new CategoryType("Error"), args);
    }
    if(context.getRegisteredValue(errorName)==null)
        context.registerValue(new ErrorVariable(errorName));
    var error = exp.interpret(context);
    context.setValue(errorName, error);
    return error;
};
