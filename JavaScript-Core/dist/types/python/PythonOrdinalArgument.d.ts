import IPythonExpression from "./IPythonExpression";
import { CodeWriter } from "../utils";
export default class PythonOrdinalArgument implements IPythonExpression {
    expression: IPythonExpression;
    constructor(expression: IPythonExpression);
    toDialect(writer: CodeWriter): void;
}
