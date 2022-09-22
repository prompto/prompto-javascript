import ExecutionError from './ExecutionError.ts'
import { TextLiteral } from '../literal'

export default class InvalidResourceError extends ExecutionError {

	constructor(message) {
		super(message);
	}

	etExpression(context) {
		return new TextLiteral(this.message);
	}

}
