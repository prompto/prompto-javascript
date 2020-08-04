class CssCode {
    constructor(expression) {
        this.expression = expression;
        return this;
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

exports.CssCode = CssCode;
