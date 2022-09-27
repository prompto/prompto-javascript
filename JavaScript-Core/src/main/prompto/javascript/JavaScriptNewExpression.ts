/* eslint-disable @typescript-eslint/no-unsafe-return */
import JavaScriptExpression from './JavaScriptExpression'
import {JavaScriptMethodExpression, JavaScriptModule} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class JavaScriptNewExpression extends JavaScriptExpression {

    method: JavaScriptMethodExpression;

    constructor(method: JavaScriptMethodExpression) {
        super();
        this.method = method;
    }

    toString() {
        return "new " + this.method.toString();
    }

    interpret(context: Context, module: JavaScriptModule) {
        return this.method.interpretNew(context, module);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('new ');
        this.method.transpile(transpiler);
    }

    toDialect(writer: CodeWriter): void {
        writer.append('new ');
        this.method.toDialect(writer);
    }

    getRoot(): string {
        return this.method.getRoot();
    }
}
