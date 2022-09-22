import NativeType from '../../../main/prompto/type/NativeType.ts'
import { IntegerType, BooleanType } from '../type'
import { Identifier } from '../grammar'
import { DecimalValue } from '../value'
import { isADecimal } from '../utils'


export default class DecimalType extends NativeType {

    constructor() {
        super(new Identifier("Decimal"));
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(isADecimal);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Decimal"')
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || (other === IntegerType.instance);
    }

    checkAdd(context, section, other, tryReverse) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkMultiply(context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkDivide(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkDivide(context, other);
        }
    }

    declareDivide(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            transpiler.append("divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileDivide(transpiler, other, left, right);
    }

    checkIntDivide(context, other) {
        if(other === IntegerType.instance) {
            return IntegerType.instance;
        } else {
            return super.checkIntDivide(context, other);
        }
    }

    declareIntDivide(transpiler, other, left, right) {
        if(other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareIntDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return super.transpileIntDivide(transpiler, other, left, right);
    }

    checkModulo(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkModulo(context, other);
        }
    }

    declareModulo(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return;
        } else {
            return super.declareModulo(transpiler, other, left, right);
        }
    }

    transpileModulo(transpiler, other, left, right) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" % ");
            right.transpile(transpiler);
        } else
            return super.transpileModulo(transpiler, other, left, right);
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
        if("text" === name)
            transpiler.append("toDecimalString()");
        else
            super.transpileMember(transpiler, name);
    }

    checkCompare(context, section, other) {
        if(other instanceof IntegerType || other instanceof DecimalType) {
            return BooleanType.instance;
        } else {
            return super.checkCompare(context, section, other);
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
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }
}

DecimalType.instance = new DecimalType();

