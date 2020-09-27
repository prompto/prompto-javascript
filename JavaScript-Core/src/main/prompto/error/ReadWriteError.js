import ExecutionError from './ExecutionError.js'

export default class ReadWriteError extends ExecutionError {

    getExpression(context) {
        return context.getRegisteredValue("READ_WRITE");
    }
}
