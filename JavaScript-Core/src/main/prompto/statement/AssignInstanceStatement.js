import SimpleStatement from '../../../main/prompto/statement/SimpleStatement.ts'
import { VoidType, CodeType } from '../type'

export default class AssignInstanceStatement extends SimpleStatement {
  
    constructor(instance, expression) {
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

    check(context: Context): Type {
        const valueType = this.expression.check(context);
        if(valueType === VoidType.instance)
            context.problemListener.reportAssigningVoidType(this);
        this.instance.checkAssignValue(context, valueType, this);
        // Code expressions need to be interpreted as part of full check
        if (valueType === CodeType.instance) {
            this.instance.assign(context, this.expression);
        }
        return VoidType.instance;
    }

    interpret(context: Context): Value {
        this.instance.assign(context, this.expression);
        return null;
    }

    declare(transpiler: Transpiler): void {
        this.instance.declareAssign(transpiler, this.expression);
    }

    transpile(transpiler: Transpiler): void {
        const valueType = this.expression.check(transpiler.context);
        // don't assign Code expressions
        if (valueType === CodeType.instance) {
            this.instance.declareAssign(transpiler, this.expression);
            return true;
        } else
            this.instance.transpileAssign(transpiler, this.expression);
    }
}
