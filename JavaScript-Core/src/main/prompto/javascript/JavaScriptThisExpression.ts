import JavaScriptExpression from './JavaScriptExpression'
import { ThisExpression } from '../expression'
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class JavaScriptThisExpression extends JavaScriptExpression {

    expression: ThisExpression;

    constructor() {
        super();
        this.expression = new ThisExpression();
    }

    interpret(context: Context): any {
        return this.expression.interpret(context);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("this");
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("this");
    }

    toString() {
        return "this";
    }

    getRoot(): string {
        return "this";
    }
}
