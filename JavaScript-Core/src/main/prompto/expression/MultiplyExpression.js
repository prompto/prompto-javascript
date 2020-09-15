import Expression from './Expression.js'

export default class MultiplyExpression extends Expression {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " * " + this.right.toString();
    }

    toDialect(writer) {
        this.left.toDialect(writer);
        writer.append(" * ");
        this.right.toDialect(writer);
    }

    check(context) {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkMultiply(context,rt, true);
    }

    interpret(context) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Multiply(context, rval);
    }

    declare(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareMultiply(transpiler, rt, true, this.left, this.right);
    }

    transpile(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileMultiply(transpiler, rt, true, this.left, this.right);
    }
}
