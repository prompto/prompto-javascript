import ExecutionError from './ExecutionError'
import { Identifier } from "../grammar";
import {Context} from "../runtime";
import {IExpression} from "../expression";

export default class DivideByZeroError extends ExecutionError {

	getExpression(context: Context) {
		return context.getRegisteredInstance(new Identifier("DIVIDE_BY_ZERO")) as unknown as IExpression;
	}

}
