import {CodeWriter} from "../utils";
import CSharpExpression from "./CSharpExpression";

export default class CSharpStatement {

    expression: CSharpExpression;
    isReturn: boolean;

    constructor(expression: CSharpExpression, isReturn: boolean) {
        this.expression = expression;
        this.isReturn = isReturn;
    }

    toString(): string {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    toDialect(writer: CodeWriter): void {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        writer.append(';');
    }
}
