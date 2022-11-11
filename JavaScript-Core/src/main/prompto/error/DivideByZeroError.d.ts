import ExecutionError from './ExecutionError'
import {Context} from "../runtime";
import {IExpression} from "../expression";

export default class DivideByZeroError extends ExecutionError {

	getExpression(context: Context): IExpression;

}
