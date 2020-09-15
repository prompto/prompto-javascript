import NativeType from './NativeType.js'
import { DecimalType, TextType, BooleanType, CharacterType, RangeType, ListType, PeriodType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { IntegerValue, IntegerRange } from '../value/index.js'
import { FormatMethodDeclaration } from '../builtins/IntegerTypeBuiltins.js'


export default class IntegerType extends NativeType {

    constructor() {
        super(new Identifier("Integer"));
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || (other == DecimalType.instance);
    }

    declare(transpiler) {
        const isAnInteger = require("../utils/Utils").isAnInteger;
        transpiler.require(isAnInteger);
    }

    transpile(transpiler) {
        transpiler.append('"Integer"');
    }

    checkAdd(context, other, tryReverse) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return other;
        } else {
            return super.checkAdd(context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context, other) {
        if(other === IntegerType.instance) {
            return this;
        } else if(other === DecimalType.instance) {
            return other;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance) {
            return this;
        } else if(other === DecimalType.instance) {
            return other;
        } else if(other === CharacterType.instance) {
            return TextType.instance;
        } else if(other === TextType.instance) {
            return other;
        } else if(other === PeriodType.instance) {
            return other;
        } else if(other instanceof ListType) {
            return other;
        } else {
            return super.checkMultiply(context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkDivide(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return DecimalType.instance;
        } else {
            return super.checkDivide(context, other);
        }
    }

    declareDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
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
            return this;
        } else {
            return super.checkIntDivide(context, other);
        }
    }

    declareIntDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareIntDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            // TODO check negative values
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return super.transpileIntDivide(transpiler, other, left, right);
    }

    checkModulo(context, other) {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return super.checkModulo(context, other);
        }
    }

    declareModulo(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareModulo(transpiler, other, left, right);
    }

    transpileModulo(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            // TODO check negative values
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

    checkCompare(context, other, section) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return BooleanType.instance;
        } else {
            return super.checkCompare(context, other, section);
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

    checkRange(context, other) {
        if(other === IntegerType.instance) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === IntegerType.instance) {
            const module = require("../intrinsic/Range");
            transpiler.require(module.Range);
            transpiler.require(module.IntegerRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler, first, last) {
        transpiler.append("new IntegerRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    newRange(left, right) {
        if(left instanceof IntegerValue && right instanceof IntegerValue) {
            return new IntegerRange(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (typeof(value)=='number') {
            return new IntegerValue(value);
        } else {
            return value; // TODO for now
        }
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "format":
                return [new FormatMethodDeclaration()];
            default:
                return super.getMemberMethods.call(context, name);
        }
    }
}

IntegerType.instance = new IntegerType();


