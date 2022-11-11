import JavaScriptExpression from './JavaScriptExpression';
import { Context, Transpiler } from "../runtime";
import { Identifier } from "../grammar";
import { CodeWriter } from "../utils";
import { JavaScriptModule } from "./index";
export default class JavaScriptIdentifierExpression extends JavaScriptExpression {
    id: Identifier;
    constructor(id: Identifier);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    getRoot(): string;
    interpret(context: Context, module: JavaScriptModule): any | null;
    interpret_prompto(context: Context): any | null;
    interpret_instance(context: Context): any | null;
    interpret_module(module: JavaScriptModule): any | null;
    interpret_global(): any | null;
}
