import PythonNativeCall from './PythonNativeCall.js'

export default class Python3NativeCall extends PythonNativeCall {

    constructor(statement, module) {
        super(statement, module);
    }

    toDialect(writer) {
        writer.append("Python3: ");
        super.toDialect(writer);
    }
}

