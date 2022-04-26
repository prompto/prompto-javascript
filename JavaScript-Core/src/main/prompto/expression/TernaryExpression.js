import Expression from './Expression.js'
import { Dialect } from '../parser/index.js'
import { BooleanType, TypeMap } from '../type/index.js'
import { BooleanValue } from '../value/index.js'
import { EqualsExpression } from "./index.js";

export default class TernaryExpression extends Expression {

    constructor(condition, ifTrue, ifFalse) {
        super();
        this.condition = condition;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
    }

    toDialect(writer) {
        if(writer.dialect === Dialect.O) {
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
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downcast(context, false);
        const types = new TypeMap();
        types.add(this.ifTrue.check(context));
        types.add(this.ifFalse.check(context));
        return types.inferType(context, this);
    }

    interpret(context) {
        const test = this.condition.interpret(context);
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downcast(context, true);
        if(test === BooleanValue.TRUE)
            return this.ifTrue.interpret(context);
        else
            return this.ifFalse.interpret(context);
    }

    declare(transpiler) {
        this.condition.declare(transpiler);
        if(this.condition instanceof EqualsExpression) {
            var context = this.condition.downcast(transpiler.context, false);
            transpiler = transpiler.newChildTranspiler(context);
        }
        this.ifTrue.declare(transpiler);
        this.ifFalse.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(");
        this.condition.transpile(transpiler);
        if(this.condition instanceof EqualsExpression) {
            var context = this.condition.downcast(transpiler.context, false);
            transpiler = transpiler.newChildTranspiler(context);
        }
        transpiler.append(" ? ");
        this.ifTrue.transpile(transpiler);
        transpiler.append(" : ");
        this.ifFalse.transpile(transpiler);
        transpiler.append(")");
        transpiler.flush();
    }
}
