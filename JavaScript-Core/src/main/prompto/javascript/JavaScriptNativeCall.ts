import NativeCall from '../statement/NativeCall'
import {Context, Transpiler} from "../runtime";
import {Type} from "../type";
import {CodeWriter} from "../utils";

export default class JavaScriptNativeCall extends NativeCall {

    constructor(statement, module) {
        super();
        this.statement = statement;
    }

    toString() {
        return this.statement.toString();
    }

    check(context: Context): Type {
        return this.statement.check(context);
    }

    interpret(context, returnType) {
        return this.statement.interpret(context, returnType);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("JavaScript: ");
        this.statement.toDialect(writer);
    }

    transpile(transpiler: Transpiler): void {
        this.statement.transpile(transpiler);
    }

    declare(transpiler: Transpiler): void {
        this.statement.declare(transpiler);
    }
}
