export default class PromptoError {

    constructor() {
        // fill the stack using native error
        this.error = Error.apply(this, arguments);
        this.name = this.error.name = 'PromptoError';

    }

    get message() {
        return this.error.message;
    }

    get stack() {
        return this.error.stack;
    }

}
