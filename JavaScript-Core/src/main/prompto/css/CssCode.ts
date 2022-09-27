import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";
import {CssValue} from "../value";

export default class CssCode implements CssValue {

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
