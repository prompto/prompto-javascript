import { Context, Transpiler } from "../runtime";
import { JavaScriptModule } from "./index";
import { CodeWriter } from "../utils";
export default abstract class JavaScriptExpression {
    abstract interpret(context: Context, module?: JavaScriptModule): any;
    abstract toDialect(writer: CodeWriter): void;
    abstract getRoot(): string;
    abstract transpile(transpiler: Transpiler): void;
}
