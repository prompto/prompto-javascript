import ExecutionError from './ExecutionError.js'
import { Identifier } from "../grammar/index.js";

export default class NullReferenceError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("NULL_REFERENCE"));
	}
}
