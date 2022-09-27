import SimpleStatement from './SimpleStatement'
import { VoidType } from '../type'
import { NullValue } from '../value'
import { VoidResult } from '../runtime'
import {IExpression} from "../expression";

export default class ReturnStatement extends SimpleStatement {

    expression: IExpression;

    constructor(expression, fromArrowExpression) {
        super();
        this.expression = expression || null;
        this.fromArrowExpression = fromArrowExpression || false;
    }

    toString() {
        return "return " + this.expression==null ? "" : this.expression.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("return");
        if(this.expression!=null) {
            writer.append(" ");
            this.expression.toDialect(writer);
        }
    }

    equals(obj) {
        if(obj==this) {
            return true;
        }
        if(obj==null) {
            return false;
        }
        if(!(obj instanceof ReturnStatement)) {
            return false;
        }
        if(this.expression==obj.expression)
            return true;
        else if(this.expression==null || obj.expression==null)
            return false;
        else
            return this.expression.equals(obj.expression);
    }

    declare(transpiler: Transpiler): void {
        if(this.expression)
            this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("return");
        if(this.expression) {
            transpiler.append(" ");
            this.expression.transpile(transpiler);
        }
    }

    check(context: Context): Type {
        if(this.expression==null)
            return VoidType.instance;
        const type = this.expression.check(context);
        if(type == VoidType.instance && !this.fromArrowExpression)
            context.problemListener.reportReturningVoidType(this.expression);
        return type;
    }

    interpret(context: Context): Value {
        if(this.expression==null)
            return VoidResult.instance;
        else
            return this.expression.interpret(context) || NullValue.instance;
    }

    canReturn() {
        return true;
    }
}

