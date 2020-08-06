const NativeCall = require("../statement/NativeCall").NativeCall;

class JavaNativeCall extends NativeCall {
    constructor(statement) {
        super();
        this.statement = statement;
        return this;
    }

    toDialect(writer) {
        writer.append("Java: ");
        this.statement.toDialect(writer);
    }
}

exports.JavaNativeCall = JavaNativeCall;

