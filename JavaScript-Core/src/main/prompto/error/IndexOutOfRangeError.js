import ExecutionError from './ExecutionError.ts'
import { Identifier } from "../grammar";

export default class IndexOutOfRangeError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("INDEX_OUT_OF_RANGE"));
	}
}
