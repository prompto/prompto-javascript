import CSharpSelectorExpression from './CSharpSelectorExpression';
import { CSharpExpressionList } from '../csharp';
import { CodeWriter } from "../utils";
export default class CSharpMethodExpression extends CSharpSelectorExpression {
    name: string;
    args: CSharpExpressionList;
    constructor(name: string, args: CSharpExpressionList | null);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
