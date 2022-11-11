import JavaScriptExpression from './JavaScriptExpression';
import { JavaScriptMethodExpression, JavaScriptModule } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class JavaScriptNewExpression extends JavaScriptExpression {
    method: JavaScriptMethodExpression;
    constructor(method: JavaScriptMethodExpression);
    toString(): string;
    interpret(context: Context, module: JavaScriptModule): any;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    getRoot(): string;
}
