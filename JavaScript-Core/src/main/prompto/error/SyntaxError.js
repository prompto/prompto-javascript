import PromptoError from './PromptoError.js'

export default function SyntaxError(message) {
	PromptoError.call(this, message);
	return this;
}

SyntaxError.prototype = Object.create(PromptoError.prototype);
SyntaxError.prototype.constructor = SyntaxError;
