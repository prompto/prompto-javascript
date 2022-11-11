import { CodeWriter } from "../utils";
export default interface IPythonExpression {
    toDialect(writer: CodeWriter): void;
}
