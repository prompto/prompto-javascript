const PythonNativeCall = require("./PythonNativeCall").PythonNativeCall;

class Python3NativeCall extends PythonNativeCall {
    constructor(statement, module) {
        super(statement, module);
        return this;
    }

    toDialect(writer) {
        writer.append("Python3: ");
        super.toDialect(writer);
    }
}


exports.Python3NativeCall = Python3NativeCall;