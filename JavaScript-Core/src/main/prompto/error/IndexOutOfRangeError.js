import ExecutionError from './ExecutionError.js';

export default class IndexOutOfRangeError extends ExecutionError {
    getExpression(context) {
        return context.getRegisteredInstanceByName("INDEX_OUT_OF_RANGE");
    }
}
