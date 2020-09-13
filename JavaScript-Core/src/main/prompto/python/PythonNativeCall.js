import NativeCall from "../statement/NativeCall"

export default class PythonNativeCall extends NativeCall {

    constructor(statement) {
        super();
        this.statement = statement;
    }

    toDialect(writer) {
        this.statement.toDialect(writer);
    }
}

