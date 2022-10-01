import ExecutionError from './ExecutionError'
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import {IExpression} from "../expression";


export default class NotStorableError extends ExecutionError {

	getExpression(context: Context) {
		return context.getRegisteredInstance(new Identifier("NOT_STORABLE")) as unknown as IExpression;
	}
}
