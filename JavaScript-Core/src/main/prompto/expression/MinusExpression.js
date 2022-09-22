import BaseExpression from '../../../main/prompto/expression/BaseExpression.ts'

export default class MinusExpression extends BaseExpression {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "-" + this.expression.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("-");
        this.expression.toDialect(writer);
    }

    check(context: Context): Type {
        const type = this.expression.check(context);
        return type.checkMinus(context);
    }

    interpret(context: Context): Value {
        const val = this.expression.interpret(context);
        return val.Minus(context);
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
        const type = this.expression.check(transpiler.context);
        return type.declareMinus(transpiler, this.expression);
    }

    transpile(transpiler: Transpiler): void {
        const type = this.expression.check(transpiler.context);
        return type.transpileMinus(transpiler, this.expression);
    }
}
