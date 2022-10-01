import BaseExpression from './BaseExpression'
import {Dialect, Section} from '../parser'
import {BooleanType, IType, TypeMap} from '../type'
import {BooleanValue, IValue} from '../value'
import {EqualsExpression, IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";

export default class TernaryExpression extends BaseExpression {

    condition: IExpression;
    ifTrue: IExpression;
    ifFalse: IExpression;

    constructor(condition: IExpression, ifTrue: IExpression, ifFalse: IExpression) {
        super();
        this.condition = condition;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
    }

    toDialect(writer: CodeWriter): void {
        if(writer.dialect == Dialect.O) {
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

    check(context: Context): IType {
        const type = this.condition.check(context);
        if(!(type instanceof BooleanType))
            context.problemListener.reportIllegalAssignment(this.asSection(), BooleanType.instance, type);
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downcast(context, false);
        const types = new TypeMap();
        types.add(this.ifTrue.check(context));
        types.add(this.ifFalse.check(context));
        return types.inferType(context, this);
    }

    interpret(context: Context): IValue {
        const test = this.condition.interpret(context);
        if(this.condition instanceof EqualsExpression)
            context = this.condition.downcast(context, true);
        if(test == BooleanValue.TRUE)
            return this.ifTrue.interpret(context);
        else
            return this.ifFalse.interpret(context);
    }

    declare(transpiler: Transpiler): void {
        this.condition.declare(transpiler);
        if(this.condition instanceof EqualsExpression) {
            const context = this.condition.downcast(transpiler.context, false);
            transpiler = transpiler.newChildTranspiler(context);
        }
        this.ifTrue.declare(transpiler);
        this.ifFalse.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(");
        this.condition.transpile(transpiler);
        if(this.condition instanceof EqualsExpression) {
            const context = this.condition.downcast(transpiler.context, false);
            transpiler = transpiler.newChildTranspiler(context);
        }
        transpiler.append(" ? ");
        this.ifTrue.transpile(transpiler);
        transpiler.append(" : ");
        this.ifFalse.transpile(transpiler);
        transpiler.append(")");
        transpiler.flush();
    }

    asSection(): Section {
        return this.condition instanceof Section ? this.condition : this;
    }
}
