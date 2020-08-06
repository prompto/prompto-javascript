const NativeType = require("./NativeType").NativeType;
const IntegerType = require("./IntegerType").IntegerType;
const Identifier = require("../grammar/Identifier").Identifier;
const Period = require("../intrinsic/Period").Period;
const PeriodValue = require("../value/PeriodValue").PeriodValue;

class PeriodType extends NativeType {
    constructor() {
        super(new Identifier("Period"));
        return this;
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if(value instanceof Period)
            return new PeriodValue(value);
        else
            return NativeType.prototype.convertJavaScriptValueToPromptoValue.call(this, context, value, returnType);
    }

    checkAdd(context, other, tryReverse) {
        if(other instanceof PeriodType) {
            return this;
        } else {
            return NativeType.prototype.checkAdd(this, context, other, tryReverse);
        }
    }

    declare(transpiler) {
        transpiler.register(Period);
    }

    transpile(transpiler) {
        transpiler.append('Period')
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if(other === PeriodType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkSubtract(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if(other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if(other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtract(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return NativeType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkMultiply(this, context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".multiply(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    checkMinus(context) {
        return this;
    }

    declareMinus(transpiler, value) {
        // nothing to do
    }

    transpileMinus(transpiler, value) {
        value.transpile(transpiler);
        transpiler.append(".minus()");
    }
}

PeriodType.instance = new PeriodType();


exports.PeriodType = PeriodType;
