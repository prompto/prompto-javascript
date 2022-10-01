import BaseExpression from './BaseExpression'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {IValue} from "../value";

export default class SubtractExpression extends BaseExpression {

    left: IExpression;
    right: IExpression;

    constructor(left: IExpression, right: IExpression) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " - " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" - ");
        this.right.toDialect(writer);
    }

    check(context: Context): IType {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkSubtract(context, this, rt);
    }

    interpret(context: Context): IValue {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Subtract(context, rval);
    }

    declare(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareSubtract(transpiler, rt, this.left, this.right);
    }

    transpile(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileSubtract(transpiler, rt, this.left, this.right);
    }
}



