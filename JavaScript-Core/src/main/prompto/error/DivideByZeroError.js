
export default function DivideByZeroError() {
	ExecutionError.call(this);
	return this;
}

DivideByZeroError.prototype = Object.create(ExecutionError.prototype);
DivideByZeroError.prototype.constructor = DivideByZeroError;

DivideByZeroError.prototype.getExpression = function(context) {
	return context.getRegisteredValue("DIVIDE_BY_ZERO");
};
