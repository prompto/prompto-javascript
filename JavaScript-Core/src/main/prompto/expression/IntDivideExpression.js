import BaseExpression from '../../../main/prompto/expression/BaseExpression.ts'

export default class IntDivideExpression extends BaseExpression {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " \\ " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" \\ ");
        this.right.toDialect(writer);
    }

    check(context: Context): Type {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkIntDivide(context,rt);
    }

    interpret(context: Context): Value {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.IntDivide(context, rval);
    }

    declare(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareIntDivide(transpiler, rt, this.left, this.right);
    }

    transpile(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileIntDivide(transpiler, rt, this.left, this.right);
    }
}
