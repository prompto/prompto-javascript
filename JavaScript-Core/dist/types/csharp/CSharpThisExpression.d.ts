import CSharpExpression from './CSharpExpression';
import { CodeWriter } from "../utils";
export default class CSharpThisExpression extends CSharpExpression {
    constructor();
    toDialect(writer: CodeWriter): void;
    toString(): string;
}
