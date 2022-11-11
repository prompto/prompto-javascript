import ExecutionError from './ExecutionError.js';

export default class ReadWriteError extends ExecutionError {
    getExpression(context) {
        return context.getRegisteredInstanceByName("READ_WRITE");
    }
}
