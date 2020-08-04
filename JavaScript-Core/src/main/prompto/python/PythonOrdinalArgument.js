class PythonOrdinalArgument {
    constructor(expression) {
        this.expression = expression;
        return this;
    }

    toDialect(writer) {
        this.expression.toDialect(writer);
    }
}

exports.PythonOrdinalArgument = PythonOrdinalArgument;
