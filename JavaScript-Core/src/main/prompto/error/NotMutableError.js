import ExecutionError from './ExecutionError.js'

export default class NotMutableError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue("NOT_MUTABLE");
	}
}
