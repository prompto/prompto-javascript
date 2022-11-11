import JavaExpression from './JavaExpression';
import { CodeWriter } from "../utils";
export default class JavaIdentifierExpression extends JavaExpression {
    parent: JavaExpression | null;
    identifier: string;
    isChildClass: boolean;
    constructor(parent: JavaExpression | null, identifier: string, isChildClass?: boolean);
    parse(ids: string): JavaIdentifierExpression;
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
