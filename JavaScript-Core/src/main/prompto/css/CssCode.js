export default class CssCode {

    constructor(expression) {
        this.expression = expression;
    }

    toDialect(writer) {
        writer.append("{");
        this.expression.toDialect(writer);
        writer.append("}");
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        this.expression.transpile(transpiler);
    }
}
