import ExecutionError from './ExecutionError'
import { Identifier } from "../grammar";
import {Context} from "../runtime";
import {IExpression} from "../expression";

export default class NotMutableError extends ExecutionError {

	getExpression(context: Context) {
		return context.getRegisteredInstance(new Identifier("NOT_MUTABLE")) as unknown as IExpression;
	}

}
