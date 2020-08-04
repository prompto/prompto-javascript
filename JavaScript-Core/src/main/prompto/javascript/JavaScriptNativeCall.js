var NativeCall = require("../statement/NativeCall").NativeCall;

class JavaScriptNativeCall extends NativeCall {
    constructor(statement, module) {
        super();
        this.statement = statement;
        return this;
    }

    toString() {
        return this.statement.toString();
    }

    check(context) {
        return this.statement.check(context);
    }

    interpret(context, returnType) {
        return this.statement.interpret(context, returnType);
    }

    toDialect(writer) {
        writer.append("JavaScript: ");
        this.statement.toDialect(writer);
    }

    transpile(transpiler) {
        this.statement.transpile(transpiler);
    }

    declare(transpiler) {
        this.statement.declare(transpiler);
    }
}

exports.JavaScriptNativeCall = JavaScriptNativeCall;

