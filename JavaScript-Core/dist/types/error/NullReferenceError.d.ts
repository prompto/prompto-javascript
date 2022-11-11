import ExecutionError from './ExecutionError'
import {IExpression} from "../expression";
import {Context} from "../runtime";

export default class NullReferenceError extends ExecutionError {
	getExpression(context: Context): IExpression;
}
