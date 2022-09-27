import NativeCall from '../statement/NativeCall'
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {CodeWriter} from "../utils";
import {JavaScriptModule, JavaScriptStatement} from "./index";

export default class JavaScriptNativeCall extends NativeCall {

    statement: JavaScriptStatement;
    module?: JavaScriptModule;

    constructor(statement: JavaScriptStatement, module?: JavaScriptModule) {
        super();
        this.statement = statement;
        this.module = module;
    }

    toString() {
        return this.statement.toString();
    }

    check(context: Context): IType {
        return this.statement.check(context);
    }

    interpret(context: Context, returnType: IType) {
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
