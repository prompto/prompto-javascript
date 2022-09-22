import ExecutionError from './ExecutionError.ts'
import { Identifier } from "../grammar";

export default class NullReferenceError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("NULL_REFERENCE"));
	}
}
