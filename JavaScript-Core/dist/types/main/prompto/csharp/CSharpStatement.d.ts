import { CodeWriter } from "../utils";
import CSharpExpression from "./CSharpExpression";
export default class CSharpStatement {
    expression: CSharpExpression;
    isReturn: boolean;
    constructor(expression: CSharpExpression, isReturn: boolean);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
