import ExecutionError from './ExecutionError.js'
import { TextLiteral } from '../literal/index.js'

export default class InvalidResourceError extends ExecutionError {

	constructor(message) {
		super(message);
	}

	etExpression(context) {
		return new TextLiteral(this.message);
	}

}
