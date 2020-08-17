export default function PromptoError() {
    var tmp = Error.apply(this, arguments);
    this.message = tmp.message
    tmp.name = this.name = 'PromptoError'
    Object.defineProperty(this, "stack", {
        get: function () {
            return tmp.stack
        }
    });
    return this;
}
