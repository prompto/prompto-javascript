import Expression from './Expression.js'
import { CategoryType } from '../type/index.js'
import { NullValue, ConcreteInstance, NativeInstance } from '../value/index.js'

export default class MutableExpression extends Expression {

    constructor(source) {
        super();
        this.source = source;
    }

    check(context) {
        const sourceType = this.source.check(context);
        if(!(sourceType instanceof CategoryType))
            context.problemListener.reportInvalidCopySource(this);
        return new CategoryType(sourceType, true);

    }

    interpret(context) {
        const value = this.source.interpret(context);
        if(value == null || value == NullValue.instance )
            return value;
        else if(value instanceof ConcreteInstance || value instanceof NativeInstance)
            return value.toMutable();
        else
            context.problemListener.reportInvalidCopySource(this);
    }

    declare(transpiler) {
        this.source.declare(transpiler);
    }

    transpile(transpiler) {
        this.source.transpile(transpiler);
        transpiler.append(".toMutable()");
    }

    toDialect(writer) {
        writer.append("mutable ");
        this.source.toDialect(writer);
    }
}