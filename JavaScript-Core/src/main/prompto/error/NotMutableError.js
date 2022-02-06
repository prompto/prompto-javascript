import ExecutionError from './ExecutionError.js'
import { Identifier } from "../grammar/index.js";

export default class NotMutableError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("NOT_MUTABLE"));
	}
}
