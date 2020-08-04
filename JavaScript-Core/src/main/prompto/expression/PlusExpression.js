var Expression = require("./Expression").Expression;

class PlusExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
        return this;
    }

    toString() {
        return this.left.toString() + " + " + this.right.toString();
    }

    toDialect(writer) {
        this.left.toDialect(writer);
        writer.append(" + ");
        this.right.toDialect(writer);
    }

    check(context) {
        var lt = this.left.check(context);
        var rt = this.right.check(context);
        return lt.checkAdd(context,rt, true);
    }

    interpret(context) {
        var lval = this.left.interpret(context);
        var rval = this.right.interpret(context);
        return lval.Add(context, rval);
    }

    declare(transpiler) {
        var lt = this.left.check(transpiler.context);
        var rt = this.right.check(transpiler.context);
        lt.declareAdd(transpiler, rt, true, this.left, this.right);
    }

    transpile(transpiler) {
        var lt = this.left.check(transpiler.context);
        var rt = this.right.check(transpiler.context);
        return lt.transpileAdd(transpiler, rt, true, this.left, this.right);
    }
}

exports.PlusExpression = PlusExpression;

