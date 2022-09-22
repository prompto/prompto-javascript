import ExecutionError from '../../../main/prompto/error/ExecutionError.ts'
import { Identifier } from "../grammar";

export default class DivideByZeroError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue(new Identifier("DIVIDE_BY_ZERO"));
	}
}
