export default class PythonStatement {

    constructor(expression, isReturn) {
        this.expression = expression;
        this.isReturn = isReturn;
        this.module = null;
    }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    toDialect(writer) {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        if(this.module!=null)
            this.module.toDialect(writer);
    }
}