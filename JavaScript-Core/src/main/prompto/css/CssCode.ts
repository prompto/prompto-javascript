import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";
import ICssValue from "./ICssValue";

export default class CssCode implements ICssValue {

    expression: IExpression;

    constructor(expression: IExpression) {
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("{");
        this.expression.toDialect(writer);
        writer.append("}");
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.expression.transpile(transpiler);
    }
}
