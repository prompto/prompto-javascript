import IPythonExpression from "./IPythonExpression";
import { CodeWriter } from "../utils";
export default class PythonNamedArgument implements IPythonExpression {
    name: string;
    expression: IPythonExpression;
    constructor(name: string, expression: IPythonExpression);
    toDialect(writer: CodeWriter): void;
}
