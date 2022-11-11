import JavaScriptExpression from './JavaScriptExpression';
import { ThisExpression } from '../expression';
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class JavaScriptThisExpression extends JavaScriptExpression {
    expression: ThisExpression;
    constructor();
    interpret(context: Context): any;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    toString(): string;
    getRoot(): string;
}
