import Expression from "./Expression"
import { Dialect } from "../parser/index"
import { BooleanType, TypeMap } from "../type/index"
import { BooleanValue } from "../value/index"

export default class TernaryExpression extends Expression {

    constructor(condition, ifTrue, ifFalse) {
        super();
        this.condition = condition;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
    }

    toDialect(writer) {
        if(writer.dialect==Dialect.O) {
            this.condition.toDialect(writer);
            writer.append(" ? ");
            this.ifTrue.toDialect(writer);
            writer.append(" : ");
            this.ifFalse.toDialect(writer);
        } else {
            this.ifTrue.toDialect(writer);
            writer.append(" if ");
            this.condition.toDialect(writer);
            writer.append(" else ");
            this.ifFalse.toDialect(writer);
        }
    }

    check(context) {
        const type = this.condition.check(context);
        if(!(type instanceof BooleanType))
            context.problemListener.reportIllegalAssignment(this.condition, BooleanType.instance, type);
        const trueType = this.ifTrue.check(context);
        const falseType = this.ifFalse.check(context);
        const types = new TypeMap();
        types[trueType.name] = trueType;
        types[falseType.name] = falseType;
        return types.inferType(context, this);
    }

    interpret(context) {
        const test = this.condition.interpret(context);
        if(test == BooleanValue.TRUE)
            return this.ifTrue.interpret(context);
        else
            return this.ifFalse.interpret(context);
    }

    declare(transpiler) {
        this.condition.declare(transpiler);
        this.ifTrue.declare(transpiler);
        this.ifFalse.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(");
        this.condition.transpile(transpiler);
        transpiler.append(" ? ");
        this.ifTrue.transpile(transpiler);
        transpiler.append(" : ");
        this.ifFalse.transpile(transpiler);
        transpiler.append(")");
    }
}
