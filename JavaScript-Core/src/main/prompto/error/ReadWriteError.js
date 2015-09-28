var ExecutionError = require("./ExecutionError").ExecutionError;

function ReadWriteError() {
    ExecutionError.call(this);
    return this;
}

ReadWriteError.prototype = Object.create(ExecutionError.prototype);
ReadWriteError.prototype.constructor = ReadWriteError;

ReadWriteError.prototype.getExpression = function(context) {
    return context.getRegisteredValue("READ_WRITE");
};

exports.ReadWriteError = ReadWriteError;
