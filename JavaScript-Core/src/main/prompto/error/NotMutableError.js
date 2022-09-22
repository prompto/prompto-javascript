import ExecutionError from '../../../main/prompto/error/ExecutionError.ts'
import { Identifier } from "../grammar";

export default class NotMutableError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("NOT_MUTABLE"));
	}
}
