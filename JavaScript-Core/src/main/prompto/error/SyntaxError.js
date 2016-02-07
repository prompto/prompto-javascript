var PromptoError = require("./PromptoError").PromptoError;

function SyntaxError(message) {
	PromptoError.call(this, message);
	return this;
}

SyntaxError.prototype = Object.create(PromptoError.prototype);
SyntaxError.prototype.constructor = SyntaxError;

exports.SyntaxError = SyntaxError;

