import { CodeWriter } from "../utils";
export default abstract class CSharpExpression {
    abstract toDialect(writer: CodeWriter): void;
}
