import ExecutionError from './ExecutionError.js'
import { Identifier } from "../grammar/index.js";

export default class IndexOutOfRangeError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("INDEX_OUT_OF_RANGE"));
	}
}
