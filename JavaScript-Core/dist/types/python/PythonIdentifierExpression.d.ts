import IPythonExpression from './IPythonExpression';
import { CodeWriter } from "../utils";
export default class PythonIdentifierExpression implements IPythonExpression {
    static parse(ids: string): PythonIdentifierExpression;
    parent: IPythonExpression | null;
    identifier: string;
    constructor(parent: IPythonExpression | null, identifier: string);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
