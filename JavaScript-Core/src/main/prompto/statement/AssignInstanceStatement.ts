import SimpleStatement from './SimpleStatement'
import {VoidType, CodeType, IType} from '../type'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {IExpression} from "../expression";
import IAssignableInstance from "../instance/IAssignableInstance";

export default class AssignInstanceStatement extends SimpleStatement {

    instance: IAssignableInstance;
    expression: IExpression;

    constructor(instance: IAssignableInstance, expression: IExpression) {
        super();
        this.instance = instance;
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        this.instance.toDialect(writer, this.expression);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }

    toString() {
        return this.instance.toString() + " = " + this.expression.toString();
    }

    check(context: Context): IType {
        const valueType = this.expression.check(context);
        if(valueType == VoidType.instance)
            context.problemListener.reportAssigningVoidType(this);
        this.instance.checkAssignValue(context, this, valueType);
        // Code expressions need to be interpreted as part of full check
        if (valueType == CodeType.instance) {
            this.instance.assign(context, this.expression);
        }
        return VoidType.instance;
    }

    interpret(context: Context): IValue | null {
        this.instance.assign(context, this.expression);
        return null;
    }

    declare(transpiler: Transpiler): void {
        this.instance.declareAssign(transpiler, this.expression);
    }

    transpile(transpiler: Transpiler): void {
        const valueType = this.expression.check(transpiler.context);
        // don't assign Code expressions
        if (valueType == CodeType.instance) {
            this.instance.declareAssign(transpiler, this.expression);
        } else
            this.instance.transpileAssign(transpiler, this.expression);
    }
}
