import NativeCall from '../statement/NativeCall.ts'

export default class PythonNativeCall extends NativeCall {

    constructor(statement) {
        super();
        this.statement = statement;
    }

    toDialect(writer: CodeWriter): void {
        this.statement.toDialect(writer);
    }
}

