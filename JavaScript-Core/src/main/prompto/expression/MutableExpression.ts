import BaseExpression from './BaseExpression'
import {CategoryType, IType, VoidType} from '../type'
import {NullValue, IValue, Instance} from '../value'
import {Context, Transpiler} from "../runtime";
import {IExpression} from "./index";
import {CodeWriter} from "../utils";

export default class MutableExpression extends BaseExpression {

    source: IExpression;

    constructor(source: IExpression) {
        super();
        this.source = source;
    }

    check(context: Context): IType {
        const sourceType = this.source.check(context);
        if(sourceType instanceof CategoryType)
            return sourceType.asMutable(context, true);
        else {
            context.problemListener.reportInvalidCopySource(this);
            return VoidType.instance;
        }
    }

    interpret(context: Context): IValue {
        const value = this.source.interpret(context);
        if(!value || value == NullValue.instance )
            return value;
        else if(value instanceof Instance)
            return value.ToMutable();
        else {
            context.problemListener.reportInvalidCopySource(this);
            return value;
        }
    }

    declare(transpiler: Transpiler): void {
        this.source.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.source.transpile(transpiler);
        transpiler.append(".toMutable()");
    }

    toDialect(writer: CodeWriter): void {
        writer.append("mutable ");
        this.source.toDialect(writer);
    }
}
