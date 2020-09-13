import Expression from "./Expression"

export default class SubtractExpression extends Expression {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " - " + this.right.toString();
    }

    toDialect(writer) {
        this.left.toDialect(writer);
        writer.append(" - ");
        this.right.toDialect(writer);
    }

    check(context) {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkSubtract(context,rt);
    }

    interpret(context) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Subtract(context, rval);
    }

    declare(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareSubtract(transpiler, rt, this.left, this.right);
    }

    transpile(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileSubtract(transpiler, rt, this.left, this.right);
    }
}



