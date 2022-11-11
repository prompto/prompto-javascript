export default class PromptoError {
    constructor(...args) {
        // fill the stack using native error
        this.error = Error.apply(this, args);
        this.name = this.error.name = 'PromptoError';
    }
    get message() {
        return this.error.message;
    }
    get stack() {
        return this.error.stack;
    }
}
