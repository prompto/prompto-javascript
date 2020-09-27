import ExecutionError from './ExecutionError.js'

export default class IndexOutOfRangeError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue("INDEX_OUT_OF_RANGE");
	}
}
