import BaseExpression from './BaseExpression.ts'

export default class PlusExpression extends BaseExpression {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " + " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" + ");
        this.right.toDialect(writer);
    }

    check(context: Context): Type {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkAdd(context, this, rt, true);
    }

    interpret(context: Context): Value {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Add(context, rval);
    }

    declare(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        lt.declareAdd(transpiler, rt, true, this.left, this.right);
    }

    transpile(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileAdd(transpiler, rt, true, this.left, this.right);
    }
}
