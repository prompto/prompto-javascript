import CSharpExpression from './CSharpExpression';
import { CodeWriter } from "../utils";
export default class CSharpIdentifierExpression extends CSharpExpression {
    parent: CSharpIdentifierExpression | null;
    identifier: string;
    constructor(parent: CSharpIdentifierExpression | null, identifier: string);
    toString(): string;
    static parse(ids: string): CSharpIdentifierExpression;
    toDialect(writer: CodeWriter): void;
}
