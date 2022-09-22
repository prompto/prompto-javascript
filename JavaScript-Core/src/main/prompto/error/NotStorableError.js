import ExecutionError from '../../../main/prompto/error/ExecutionError.ts'


export default class NotStorableError extends ExecutionError {

	getExpression(context) {
		return context.getRegisteredValue("NOT_STORABLE");
	}
}
