import BaseExpression from './BaseExpression'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {IValue} from "../value";

export default class DivideExpression extends BaseExpression {

    left: IExpression;
    right: IExpression;

    constructor(left: IExpression, right: IExpression) {
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

    check(context: Context): IType {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkDivide(context, this, rt);
    }

    interpretExpression(context: Context): IValue {
        const lval = this.left.interpretExpression(context);
        const rval = this.right.interpretExpression(context);
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
