import ExecutionError from "./ExecutionError"
import { TextLiteral } from "../literal/index"

export default function InvalidResourceError(message) {
	ExecutionError.call(this, message);
	return this;
}

InvalidResourceError.prototype = Object.create(ExecutionError.prototype);
InvalidResourceError.prototype.constructor = InvalidResourceError;

InvalidResourceError.prototype.getExpression = function(context) {
	return new TextLiteral(this.message);
};
