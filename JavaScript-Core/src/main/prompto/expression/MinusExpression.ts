import BaseExpression from './BaseExpression'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {IValue} from "../value";

export default class MinusExpression extends BaseExpression {

    expression: IExpression;
    
    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "-" + this.expression.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("-");
        this.expression.toDialect(writer);
    }

    check(context: Context): IType {
        const type = this.expression.check(context);
        return type.checkMinus(context);
    }

    interpret(context: Context): IValue {
        const val = this.expression.interpret(context);
        return val.Minus(context);
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
        const type = this.expression.check(transpiler.context);
        return type.declareMinus(transpiler, this.expression);
    }

    transpile(transpiler: Transpiler): void {
        const type = this.expression.check(transpiler.context);
        return type.transpileMinus(transpiler, this.expression);
    }
}
