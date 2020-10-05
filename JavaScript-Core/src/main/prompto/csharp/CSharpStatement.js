export default class CSharpStatement {

    constructor(expression, isReturn) {
        this.expression = expression;
        this.isReturn = isReturn;
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
