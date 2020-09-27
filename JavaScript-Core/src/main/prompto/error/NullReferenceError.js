import ExecutionError from './ExecutionError.js'

export default class NullReferenceError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue("NULL_REFERENCE");
	}
}
