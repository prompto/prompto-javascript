var Expression = require("./Expression").Expression;
var CategoryType = require("../type/CategoryType").CategoryType;
var NullValue = require("../value/NullValue").NullValue;
var NativeInstance = require("../value/NativeInstance").NativeInstance;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;

class MutableExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
        return this;
    }

    check(context) {
        var sourceType = this.source.check(context);
        if(!(sourceType instanceof CategoryType))
            context.problemListener.reportInvalidCopySource(this);
        return new CategoryType(sourceType, true);

    }

    interpret(context) {
        var value = this.source.interpret(context);
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

exports.MutableExpression = MutableExpression;
