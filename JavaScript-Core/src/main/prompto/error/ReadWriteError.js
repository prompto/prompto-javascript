import ExecutionError from './ExecutionError.js'

export default function ReadWriteError(message) {
    ExecutionError.call(this, message);
    return this;
}

ReadWriteError.prototype = Object.create(ExecutionError.prototype);
ReadWriteError.prototype.constructor = ReadWriteError;

ReadWriteError.prototype.getExpression = function(context) {
    return context.getRegisteredValue("READ_WRITE");
};
