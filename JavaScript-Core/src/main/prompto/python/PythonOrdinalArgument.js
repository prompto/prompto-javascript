export default class PythonOrdinalArgument {

    constructor(expression) {
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        this.expression.toDialect(writer);
    }
}

