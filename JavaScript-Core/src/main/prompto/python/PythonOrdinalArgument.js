export default class PythonOrdinalArgument {

    constructor(expression) {
        this.expression = expression;
    }

    toDialect(writer) {
        this.expression.toDialect(writer);
    }
}

