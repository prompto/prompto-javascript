import BaseExpression from './BaseExpression'
import {Expression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Type} from "../type";
import {Value} from "../value";

export default class DivideExpression extends BaseExpression {

    left: Expression;
    right: Expression;

    constructor(left: Expression, right: Expression) {
        super();
        this.left = left;
        this.right = right;
    }

    toString(): string {
        return this.left.toString() + " / " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" / ");
        this.right.toDialect(writer);
    }

    check(context: Context): Type {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkDivide(context,rt);
    }

    interpret(context: Context): Value {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Divide(context, rval);
    }

    declare(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareDivide(transpiler, rt, this.left, this.right);
    }

    transpile(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileDivide(transpiler, rt, this.left, this.right);
    }
}
