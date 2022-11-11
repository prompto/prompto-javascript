import ExecutionError from './ExecutionError.js';
export default class UserError extends ExecutionError {
    constructor(expression) {
        super("");
        this.expression = expression;
    }
    getExpression(context) {
        return this.expression;
    }
}
