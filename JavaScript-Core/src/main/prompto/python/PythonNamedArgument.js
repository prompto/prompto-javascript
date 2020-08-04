class PythonNamedArgument {
    constructor(name, expression) {
        this.name = name;
        this.expression = expression;
        return this;
    }

    toDialect(writer) {
        writer.append(this.name);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }
}

exports.PythonNamedArgument = PythonNamedArgument;
