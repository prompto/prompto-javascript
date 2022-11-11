import JavaSelectorExpression from './JavaSelectorExpression';
import JavaExpression from "./JavaExpression";
import { CodeWriter } from "../utils";
export default class JavaItemExpression extends JavaSelectorExpression {
    item: JavaExpression;
    constructor(item: JavaExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
