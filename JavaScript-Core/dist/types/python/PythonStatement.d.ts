import IPythonExpression from "./IPythonExpression";
import { PythonModule } from "./index";
import { CodeWriter } from "../utils";
export default class PythonStatement {
    expression: IPythonExpression;
    isReturn: boolean;
    module?: PythonModule;
    constructor(expression: IPythonExpression, isReturn: boolean);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
