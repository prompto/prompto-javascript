import ExecutionError from './ExecutionError'
import {Context} from "../runtime";
import {IExpression} from "../expression";

export default class InvalidResourceError extends ExecutionError {

	constructor(message: string);
	getExpression(context: Context): IExpression;

}
