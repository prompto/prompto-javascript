import BaseExpression from './BaseExpression.ts'
import { CategoryType } from '../type'
import { NullValue, ConcreteInstance, NativeInstance } from '../value'

export default class MutableExpression extends BaseExpression {

    constructor(source) {
        super();
        this.source = source;
    }

    check(context: Context): Type {
        const sourceType = this.source.check(context);
        if(!(sourceType instanceof CategoryType))
            context.problemListener.reportInvalidCopySource(this);
        return new CategoryType(sourceType, true);

    }

    interpret(context: Context): Value {
        const value = this.source.interpret(context);
        if(value == null || value == NullValue.instance )
            return value;
        else if(value instanceof ConcreteInstance || value instanceof NativeInstance)
            return value.toMutable();
        else
            context.problemListener.reportInvalidCopySource(this);
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
