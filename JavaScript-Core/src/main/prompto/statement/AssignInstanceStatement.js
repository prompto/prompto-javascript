import SimpleStatement from "./SimpleStatement"
import { VoidType, CodeType } from "../type/index"

export default class AssignInstanceStatement extends SimpleStatement {
  
    constructor(instance, expression) {
        super();
        this.instance = instance;
        this.expression = expression;
    }

    toDialect(writer) {
        this.instance.toDialect(writer, this.expression);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }

    toString() {
        return this.instance.toString() + " = " + this.expression.toString();
    }

    check(context) {
        const valueType = this.expression.check(context);
        if(valueType===VoidType.instance)
            context.problemListener.reportAssigningVoidType(this.expression);
        this.instance.checkAssignValue(context, valueType, this);
        // Code expressions need to be interpreted as part of full check
        if (valueType === CodeType.instance) {
            this.instance.assign(context, this.expression);
        }
        return VoidType.instance;
    }

    interpret(context) {
        this.instance.assign(context, this.expression);
        return null;
    }

    declare(transpiler) {
        this.instance.declareAssign(transpiler, this.expression);
    }

    transpile(transpiler) {
        const valueType = this.expression.check(transpiler.context);
        // don't assign Code expressions
        if (valueType === CodeType.instance) {
            this.instance.declareAssign(transpiler, this.expression);
            return true;
        } else
            this.instance.transpileAssign(transpiler, this.expression);
    }
}
