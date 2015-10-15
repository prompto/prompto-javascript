var ExecutionError = require("./ExecutionError").ExecutionError;

function NotStorableError() {
	ExecutionError.call(this);
	return this;
}

NotStorableError.prototype = Object.create(ExecutionError.prototype);
NotStorableError.prototype.constructor = NotStorableError;

NotStorableError.prototype.getExpression = function(context) {
	return context.getRegisteredValue("NOT_STORABLE");
};

exports.NotStorableError = NotStorableError;
