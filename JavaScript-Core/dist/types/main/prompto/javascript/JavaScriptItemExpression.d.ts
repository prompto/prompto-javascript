import JavaScriptSelectorExpression from './JavaScriptSelectorExpression';
import { JavaScriptExpression } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class JavaScriptItemExpression extends JavaScriptSelectorExpression {
    item: JavaScriptExpression;
    constructor(item: JavaScriptExpression);
    toString(): string;
    interpret(context: Context): any;
    transpile(transpiler: Transpiler): void;
    getRoot(): string;
    toDialect(writer: CodeWriter): void;
    interpret_item(context: Context, parent: any): any;
}
