var Expression = require("./Expression").Expression;

class ModuloExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
        return this;
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
        var lt = this.left.check(context);
        var rt = this.right.check(context);
        return lt.checkModulo(context, rt);
    }

    interpret(context) {
        var lval = this.left.interpret(context);
        var rval = this.right.interpret(context);
        return lval.Modulo(context, rval);
    }

    declare(transpiler) {
        var lt = this.left.check(transpiler.context);
        var rt = this.right.check(transpiler.context);
        return lt.declareModulo(transpiler, rt, this.left, this.right);
    }

    transpile(transpiler) {
        var lt = this.left.check(transpiler.context);
        var rt = this.right.check(transpiler.context);
        return lt.transpileModulo(transpiler, rt, this.left, this.right);
    }
}

exports.ModuloExpression = ModuloExpression;
