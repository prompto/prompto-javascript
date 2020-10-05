export default class PythonNamedArgument {

    constructor(name, expression) {
        this.name = name;
        this.expression = expression;
    }

    toDialect(writer) {
        writer.append(this.name);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }
}
