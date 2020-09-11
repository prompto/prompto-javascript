import ExecutionError from "./ExecutionError"

export default function NotStorableError() {
	ExecutionError.call(this);
	return this;
}

NotStorableError.prototype = Object.create(ExecutionError.prototype);
NotStorableError.prototype.constructor = NotStorableError;

NotStorableError.prototype.getExpression = function(context) {
	return context.getRegisteredValue("NOT_STORABLE");
};
