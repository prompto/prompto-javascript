import NativeCall from '../statement/NativeCall.js'

export default class JavaNativeCall extends NativeCall {

    constructor(statement) {
        super();
        this.statement = statement;
    }

    toDialect(writer) {
        writer.append("Java: ");
        this.statement.toDialect(writer);
    }
}
