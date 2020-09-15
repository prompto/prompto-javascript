import PromptoError from './PromptoError.js'

export default function InternalError(message) {
	PromptoError.call(this, message);
	return this;
}

InternalError.prototype = Object.create(PromptoError.prototype);
InternalError.prototype.constructor = InternalError;
