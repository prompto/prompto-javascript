import ExecutionError from './ExecutionError.ts'

export default class UserError extends ExecutionError {

	constructor(expression) {
		super();
		this.expression = expression;
	}

	getExpression(context) {
		return this.expression;
	}

}
