import CodeWriter from "../utils/CodeWriter";

export default abstract class JavaExpression {
    abstract toDialect(writer: CodeWriter): void;
}
