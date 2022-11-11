import IPythonExpression from "./IPythonExpression";
import { CodeWriter } from "../utils";
export default class PythonSelfExpression implements IPythonExpression {
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
