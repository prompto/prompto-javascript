import JavaExpression from './JavaExpression';
import { CodeWriter } from "../utils";
export default class JavaThisExpression extends JavaExpression {
    constructor();
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
