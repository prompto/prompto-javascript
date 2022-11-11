import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default abstract class JavaScriptLiteral {
    text: string;
    value?: any;
    constructor(text: string);
    interpret(context: Context): any;
    toString(): string;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
}
