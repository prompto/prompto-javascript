
export default class ModuloExpression extends Expression {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " % " + this.right.toString();
    }

    toDialect(writer) {
        this.left.toDialect(writer);
        writer.append(" % ");
        this.right.toDialect(writer);
    }

    check(context) {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkModulo(context, rt);
    }

    interpret(context) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Modulo(context, rval);
    }

    declare(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareModulo(transpiler, rt, this.left, this.right);
    }

    transpile(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileModulo(transpiler, rt, this.left, this.right);
    }
}
