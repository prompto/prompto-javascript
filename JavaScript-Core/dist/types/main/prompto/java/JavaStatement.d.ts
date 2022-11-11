import JavaExpression from "./JavaExpression";
import { CodeWriter } from "../utils";
export default class JavaStatement {
    expression: JavaExpression;
    isReturn: boolean;
    constructor(expression: JavaExpression, isReturn: boolean);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
