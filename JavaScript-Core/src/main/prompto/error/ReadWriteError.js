import ExecutionError from './ExecutionError.ts'

export default class ReadWriteError extends ExecutionError {

    getExpression(context) {
        return context.getRegisteredValue("READ_WRITE");
    }
}
