var PythonNativeCall = require("./PythonNativeCall").PythonNativeCall;

class Python2NativeCall extends PythonNativeCall {
    constructor(statement, module) {
        super(statement, module);
        return this;
    }

    toDialect(writer) {
        writer.append("Python2: ");
        super.toDialect(writer);
    }
}

exports.Python2NativeCall = Python2NativeCall;