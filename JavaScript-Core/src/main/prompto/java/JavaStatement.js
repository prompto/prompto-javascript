class JavaStatement {
    constructor(expression, isReturn) {
        this.expression = expression;
        this.isReturn = isReturn || false;
        return this;
    }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    toDialect(writer) {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        writer.append(';');
    }
}

exports.JavaStatement = JavaStatement;
