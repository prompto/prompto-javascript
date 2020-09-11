import ExecutionError from "./ExecutionError"

export default function UserError(expression) {
	ExecutionError.call(this);
	this.expression = expression;
	return this;
}

UserError.prototype = Object.create(ExecutionError.prototype);
UserError.prototype.constructor = UserError;

UserError.prototype.getExpression = function(context) {
	return this.expression;
};
