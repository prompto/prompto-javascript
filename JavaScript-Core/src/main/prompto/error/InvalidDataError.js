import ExecutionError from '../../../main/prompto/error/ExecutionError.ts'
import { TextLiteral } from '../literal'

export default class InvalidDataError extends ExecutionError {

	constructor(message) {
		super(message);
	}

	getExpression(context) {
		return new TextLiteral("'" + this.message + "'");
	}

}
