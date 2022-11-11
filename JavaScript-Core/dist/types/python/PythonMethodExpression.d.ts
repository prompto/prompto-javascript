import PythonSelectorExpression from './PythonSelectorExpression';
import { PythonArgumentList } from './index';
import { CodeWriter } from "../utils";
export default class PythonMethodExpression extends PythonSelectorExpression {
    name: string;
    args: PythonArgumentList;
    constructor(name: string, args: PythonArgumentList);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
