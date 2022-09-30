import SimpleStatement from './SimpleStatement'
import {IType, VoidType} from '../type'
import {IValue, NullValue} from '../value'
import {Context, Transpiler, VoidResult} from '../runtime'
import {IExpression} from "../expression";
import {CodeWriter, equalObjects} from "../utils";

export default class ReturnStatement extends SimpleStatement {

    expression: IExpression | null;
    fromArrowExpression: boolean;

    constructor(expression: IExpression | null, fromArrowExpression?: boolean) {
        super();
        this.expression = expression;
        this.fromArrowExpression = fromArrowExpression || false;
    }

    toString() {
        return "return " + (this.expression ? this.expression.toString() : "");
    }

    toDialect(writer: CodeWriter): void {
        writer.append("return");
        if(this.expression!=null) {
            writer.append(" ");
            this.expression.toDialect(writer);
        }
    }

    equals(obj: any) {
        return obj == this || (obj instanceof ReturnStatement && equalObjects(this.expression, obj.expression));
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

    check(context: Context): IType {
        if(this.expression==null)
            return VoidType.instance;
        const type = this.expression.check(context);
        if(type == VoidType.instance && !this.fromArrowExpression)
            context.problemListener.reportReturningVoidType(this.expression.asSection() || this);
        return type;
    }

    interpret(context: Context): IValue {
        if(this.expression==null)
            return VoidResult.instance;
        else
            return this.expression.interpret(context) || NullValue.instance;
    }

    canReturn() {
        return true;
    }
}

