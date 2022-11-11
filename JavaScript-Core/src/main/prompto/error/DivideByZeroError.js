import ExecutionError from './ExecutionError.js';

export default class DivideByZeroError extends ExecutionError {
    getExpression(context) {
        return context.getRegisteredInstanceByName("DIVIDE_BY_ZERO");
    }
}
