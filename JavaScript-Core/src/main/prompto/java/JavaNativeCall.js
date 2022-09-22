import NativeCall from '../statement/NativeCall.ts'

export default class JavaNativeCall extends NativeCall {

    constructor(statement) {
        super();
        this.statement = statement;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Java: ");
        this.statement.toDialect(writer);
    }
}
