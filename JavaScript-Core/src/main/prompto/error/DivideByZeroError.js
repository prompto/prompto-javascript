import ExecutionError from './ExecutionError.js'
import { Identifier } from "../grammar/index.js";

export default class DivideByZeroError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("DIVIDE_BY_ZERO"));
	}
}
