import ExecutionError from './ExecutionError'
import { TextLiteral } from '../literal'
import {Context} from "../runtime";

export default class InvalidDataError extends ExecutionError {

	constructor(message: string) {
		super(message);
	}

	getExpression(context: Context) {
		return new TextLiteral("'" + this.message + "'");
	}

}