import JavaExpression from "./JavaExpression";
import {CodeWriter} from "../utils";

export default class JavaStatement {

    expression: JavaExpression;
    isReturn: boolean;

    constructor(expression: JavaExpression, isReturn: boolean) {
        this.expression = expression;
        this.isReturn = isReturn || false;
    }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    toDialect(writer: CodeWriter): void {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        writer.append(';');
    }
}
