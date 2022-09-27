import JavaScriptExpression from './JavaScriptExpression.js'
import { ThisExpression } from '../expression'

export default class JavaScriptThisExpression extends JavaScriptExpression {

    constructor() {
        super();
        this.expression = new ThisExpression();
    }

    interpret(context: Context): IValue {
        return this.expression.interpret(context);
    }

    toDialect(writer: CodeWriter): void {
        return writer.append("this");
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("this");
    }

    toString() {
        return "this";
    }
}
