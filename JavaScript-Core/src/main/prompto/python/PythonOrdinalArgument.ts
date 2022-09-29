import IPythonExpression from "./IPythonExpression";
import {CodeWriter} from "../utils";

export default class PythonOrdinalArgument implements IPythonExpression {

    expression: IPythonExpression;

    constructor(expression: IPythonExpression) {
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        this.expression.toDialect(writer);
    }
}

