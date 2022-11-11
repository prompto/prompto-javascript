import ExecutionError from './ExecutionError'
import {IExpression} from "../expression";
import {Context} from "../runtime";

export default class UserError extends ExecutionError {

	expression: IExpression;
	constructor(expression: IExpression);
	getExpression(context: Context): IExpression;

}
