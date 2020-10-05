import NativeCall from '../statement/NativeCall.js'

export default class CSharpNativeCall extends NativeCall {

    constructor(statement) {
        super();
        this.statement = statement;
    }

    toDialect(writer) {
        writer.append("C#: ");
        this.statement.toDialect(writer);
    }
}

