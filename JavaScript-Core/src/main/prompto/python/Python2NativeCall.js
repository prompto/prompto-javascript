import PythonNativeCall from './PythonNativeCall.js'

export default class Python2NativeCall extends PythonNativeCall {

    constructor(statement, module) {
        super(statement, module);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Python2: ");
        super.toDialect(writer);
    }
}
