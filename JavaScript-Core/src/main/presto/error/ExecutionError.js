var PrestoError = require("./PrestoError").PrestoError;

function ExecutionError(message) {
	PrestoError.call(this, message);
	return this;
}

ExecutionError.prototype = Object.create(PrestoError.prototype);
ExecutionError.prototype.constructor = ExecutionError;

exports.ExecutionError = ExecutionError;
