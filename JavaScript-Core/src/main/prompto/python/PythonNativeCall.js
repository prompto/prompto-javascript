var NativeCall = require("../statement/NativeCall").NativeCall;

class PythonNativeCall extends NativeCall {
    constructor(statement) {
        super();
        this.statement = statement;
        return this;
    }

    toDialect(writer) {
        this.statement.toDialect(writer);
    }
}

exports.PythonNativeCall = PythonNativeCall;
