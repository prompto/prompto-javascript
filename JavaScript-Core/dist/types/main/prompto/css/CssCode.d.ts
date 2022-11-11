import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
import ICssValue from "./ICssValue";
export default class CssCode implements ICssValue {
    expression: IExpression;
    constructor(expression: IExpression);
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
