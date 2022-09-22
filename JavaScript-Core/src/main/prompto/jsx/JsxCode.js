import IJsxExpression from './IJsxExpression.ts'
import { JsxType } from '../type'

export default class JsxCode extends IJsxExpression {

    constructor(expression, suite) {
        super();
        this.expression = expression;
        this.suite = suite;
    }

    check(context: Context): Type {
        this.expression.check(context);
        return JsxType.instance;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("{");
        this.expression.toDialect(writer);
        writer.append("}");
        if(this.suite!=null)
            writer.appendRaw(this.suite);
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const type = this.expression.check(transpiler.context);
        type.transpileJsxCode(transpiler, this.expression);
    }
}
