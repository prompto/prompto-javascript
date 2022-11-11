import PromptoError from './PromptoError.js';

export default class InternalError extends PromptoError {
    constructor(message) {
        super(message);
    }
}
