const NativeType = require("./NativeType").NativeType;
const BooleanType = require("./BooleanType").BooleanType;
let IntegerType = null; // circular dependency
const DecimalValue = require("../value/DecimalValue").DecimalValue;
const Identifier = require("../grammar/Identifier").Identifier;

exports.resolve = () => {
	IntegerType = require("./IntegerType").IntegerType;
}

class DecimalType extends NativeType {
    constructor() {
        super(new Identifier("Decimal"));
        return this;
    }

    declare(transpiler) {
        const isADecimal = require("../utils/Utils").isADecimal;
        transpiler.require(isADecimal);
    }

    transpile(transpiler) {
        transpiler.append('"Decimal"')
    }

    isAssignableFrom(context, other) {
        return NativeType.prototype.isAssignableFrom.call(this, context, other)
            || (other == IntegerType.instance);
    }

    checkAdd(context, other, tryReverse) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkSubtract.call(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkMultiply.call(this, context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    checkDivide(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkDivide.call(this, context, other);
        }
    }

    declareDivide(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareDivide.call(this, transpiler, other, left, right);
    }

    transpileDivide(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            transpiler.append("divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return NativeType.prototype.transpileDivide.call(this, transpiler, other, left, right);
    }

    checkIntDivide(context, other) {
        if(other === IntegerType.instance) {
            return IntegerType.instance;
        } else {
            return NativeType.prototype.checkIntDivide.call(this, context, other);
        }
    }

    declareIntDivide(transpiler, other, left, right) {
        if(other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareIntDivide.call(this, transpiler, other, left, right);
    }

    transpileIntDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return NativeType.prototype.transpileIntDivide.call(this, transpiler, other, left, right);
    }

    checkModulo(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkModulo.call(this, context, other);
        }
    }

    declareModulo(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return;
        } else {
            return NativeType.prototype.declareModulo.call(this, transpiler, other, left, right);
        }
    }

    transpileModulo(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" % ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileModulo.call(this, transpiler, other, left, right);
    }

    checkMinus(context) {
        return this;
    }

    declareMinus(transpiler, value) {
        // nothing to do
    }

    transpileMinus(transpiler, value) {
        transpiler.append(" -");
        value.transpile(transpiler);
    }

    transpileMember(transpiler, name) {
        if("text" == name)
            transpiler.append("toDecimalString()");
        else
            super.transpileMember(transpiler, name);
    }

    checkCompare(context, other, section) {
        if(other instanceof IntegerType || other instanceof DecimalType) {
            return BooleanType.instance;
        } else {
            return NativeType.prototype.checkCompare.call(this, context, other, section);
        }
    }

    declareCompare(context, other) {
        // nothing to do
    }

    transpileCompare(transpiler, other, operator, left, right) {
        left.transpile(transpiler);
        transpiler.append(" ").append(operator.toString()).append(" ");
        right.transpile(transpiler);
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (typeof(value)=='number') {
            return new DecimalValue(value);
        } else {
            return value; // TODO for now
        }
    }
}

DecimalType.instance = new DecimalType();


exports.DecimalType = DecimalType;