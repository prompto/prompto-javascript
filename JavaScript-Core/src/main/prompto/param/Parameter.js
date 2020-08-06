const NamedInstance = require("../grammar/NamedInstance").NamedInstance;
const IntegerValue = require("../value/IntegerValue").IntegerValue;
const DecimalValue = require("../value/DecimalValue").DecimalValue;
const IntegerType = require("../type/IntegerType").IntegerType;
const DecimalType = require("../type/DecimalType").DecimalType;

class Parameter extends NamedInstance {
 
    constructor(id) {
        super();
        this.id = id;
        this.mutable = false;
        this.defaultExpression = null;
    }

    get name() {
        return this.id.name;
    }

    setMutable(mutable) {
        this.mutable = mutable;
    }

    checkValue(context, expression) {
        const value = expression.interpret(context);
        if (value instanceof IntegerValue && this.getType(context)==DecimalType.instance) {
            return new DecimalValue(value.DecimalValue());
        } else if (value instanceof DecimalValue && this.getType(context)==IntegerType.instance) {
            return new IntegerValue(value.IntegerValue());
        } else {
            return value;
        }
    }

    toDialect(writer) {
        if(this.mutable)
            writer.append("mutable ");
        writer.toDialect(this);
        if(this.defaultExpression!=null) {
            writer.append(" = ");
            this.defaultExpression.toDialect(writer);
        }
    }

    transpile(transpiler, expression) {
        transpiler.append(this.name);
    }

    transpileCall(transpiler, expression) {
        const expType = expression.check(transpiler.context);
        if (this.type === IntegerType.instance && expType === DecimalType.instance) {
            transpiler.append("Math.round(");
            expression.transpile(transpiler);
            transpiler.append(")");
        } else
            expression.transpile(transpiler);
    }
}

exports.Parameter = Parameter;
