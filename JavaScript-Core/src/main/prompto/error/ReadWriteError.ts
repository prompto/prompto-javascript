import ExecutionError from './ExecutionError'
import {Context} from "../runtime";
import {IExpression} from "../expression";
import {Identifier} from "../grammar";

export default class ReadWriteError extends ExecutionError {

    getExpression(context: Context) {
        return context.getRegisteredInstance(new Identifier("READ_WRITE")) as unknown as IExpression;
    }
}
