import JavaSelectorExpression from './JavaSelectorExpression';
import { JavaExpressionList } from '../java';
import { CodeWriter } from "../utils";
export default class JavaMethodExpression extends JavaSelectorExpression {
    name: string;
    args: JavaExpressionList;
    constructor(name: string, args: JavaExpressionList | null);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
