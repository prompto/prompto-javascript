import Expression from './Expression.js'

export default class MinusExpression extends Expression {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "-" + this.expression.toString();
    }

    toDialect(writer) {
        writer.append("-");
        this.expression.toDialect(writer);
    }

    check(context) {
        const type = this.expression.check(context);
        return type.checkMinus(context);
    }

    interpret(context) {
        const val = this.expression.interpret(context);
        return val.Minus(context);
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
        const type = this.expression.check(transpiler.context);
        return type.declareMinus(transpiler, this.expression);
    }

    transpile(transpiler) {
        const type = this.expression.check(transpiler.context);
        return type.transpileMinus(transpiler, this.expression);
    }
}
