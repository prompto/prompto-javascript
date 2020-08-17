
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
        this.expression.transpile(transpiler);
    }
}
