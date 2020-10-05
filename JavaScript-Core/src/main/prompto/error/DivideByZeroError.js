import ExecutionError from './ExecutionError.js'

export default class DivideByZeroError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue("DIVIDE_BY_ZERO");
	}
}
