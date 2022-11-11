import JavaScriptSelectorExpression from './JavaScriptSelectorExpression';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class JavaScriptMemberExpression extends JavaScriptSelectorExpression {
    id: Identifier;
    constructor(id: Identifier);
    toString(): string;
    interpret(context: Context): any;
    transpile(transpiler: Transpiler): void;
    getRoot(): string;
    toDialect(writer: CodeWriter): void;
    interpret_field(o: object): never;
}
