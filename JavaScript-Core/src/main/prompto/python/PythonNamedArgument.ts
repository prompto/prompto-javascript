import IPythonExpression from "./IPythonExpression";
import {CodeWriter} from "../utils";

export default class PythonNamedArgument implements IPythonExpression {

    name: string;
    expression: IPythonExpression;

    constructor(name: string, expression: IPythonExpression) {
        this.name = name;
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }
}
