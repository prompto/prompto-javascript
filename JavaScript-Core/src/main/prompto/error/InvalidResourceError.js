import ExecutionError from './ExecutionError.js';
import TextLiteral from '../literal/TextLiteral.ts';

export default class InvalidResourceError extends ExecutionError {
    constructor(message) {
        super(message);
    }
    getExpression(context) {
        return new TextLiteral(this.message);
    }
}
