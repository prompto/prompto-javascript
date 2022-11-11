import ExecutionError from './ExecutionError.js';

export default class NotStorableError extends ExecutionError {
    getExpression(context) {
        return context.getRegisteredInstanceByName("NOT_STORABLE");
    }
}
