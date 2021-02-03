import IJsxExpression from './IJsxExpression.js'
import { JsxType } from '../type/index.js'

export default class JsxCode extends IJsxExpression {

    constructor(expression, suite) {
        super();
        this.expression = expression;
        this.suite = suite;
    }

    check(context) {
        this.expression.check(context);
        return JsxType.instance;
    }

    toDialect(writer) {
        writer.append("{");
        this.expression.toDialect(writer);
        writer.append("}");
        if(this.suite!=null)
            writer.appendRaw(this.suite);
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        const type = this.expression.check(transpiler.context);
        type.transpileJsxCode(transpiler);
    }
}
