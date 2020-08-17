import ExecutionError from "./ExecutionError"
import { TextLiteral } from "../literal/index"

export default function InvalidDataError(message) {
	ExecutionError.call(this, message);
	return this;
}

InvalidDataError.prototype = Object.create(ExecutionError.prototype);
InvalidDataError.prototype.constructor = InvalidDataError;

InvalidDataError.prototype.getExpression = function(context) {
	return new TextLiteral("'" + this.message + "'");
};
