import PromptoError from './PromptoError';
import {Context,} from "../runtime";
import {Identifier} from "../grammar";
import {IExpression} from "../expression";
import {IValue} from "../value";


export default abstract class ExecutionError extends PromptoError {

    constructor(message?: string);
    abstract getExpression(context: Context): IExpression | null;
    interpret(context: Context, errorName: Identifier): IValue;
}
