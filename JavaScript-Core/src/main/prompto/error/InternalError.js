import PromptoError from "./PromptoError"

export default function InternalError(message) {
	PromptoError.call(this, message);
	return this;
}

InternalError.prototype = Object.create(PromptoError.prototype);
InternalError.prototype.constructor = InternalError;
