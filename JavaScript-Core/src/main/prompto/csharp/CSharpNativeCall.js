const NativeCall = require("../statement/NativeCall").NativeCall;

class CSharpNativeCall extends NativeCall {
    constructor(statement) {
        super();
        this.statement = statement;
        return this;
    }

    toDialect(writer) {
        writer.append("C#: ");
        this.statement.toDialect(writer);
    }
}


exports.CSharpNativeCall = CSharpNativeCall;
