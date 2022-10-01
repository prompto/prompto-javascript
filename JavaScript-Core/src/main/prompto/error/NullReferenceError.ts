import ExecutionError from './ExecutionError'
import { Identifier } from "../grammar";
import {IExpression} from "../expression";
import {Context} from "../runtime";

export default class NullReferenceError extends ExecutionError {

	getExpression(context: Context) {
		return context.getRegisteredInstance(new Identifier("NULL_REFERENCE")) as unknown as IExpression;
	}
}
