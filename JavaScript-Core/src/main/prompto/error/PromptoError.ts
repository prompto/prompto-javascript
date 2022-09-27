import {IValue} from "../value";
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {IExpression} from "../expression";

export default abstract class PromptoError {

    error: Error;
    name: string;

    constructor(...args: any[]) {
        // fill the stack using native error
        this.error = Error.apply(this, args) as Error;
        this.name = this.error.name = 'PromptoError';

    }

    get message() {
        return this.error.message;
    }

    get stack() {
        return this.error.stack;
    }

    abstract interpret(context: Context, identifier: Identifier): IValue;
    abstract getExpression(context: Context): IExpression;

}