var PromptoError = require("./PromptoError").PromptoError;

function InternalError(message) {
	PromptoError.call(this, message);
	return this;
}

InternalError.prototype = Object.create(InternalError.prototype);
InternalError.prototype.constructor = InternalError;

exports.InternalError = InternalError;
