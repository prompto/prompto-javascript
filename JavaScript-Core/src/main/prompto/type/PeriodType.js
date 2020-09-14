import NativeType from "./NativeType"
import { IntegerType } from "./index"
import { Identifier } from "../grammar/index"
import { PeriodValue } from "../value/index"
import { Period } from "../intrinsic/index"


export default class PeriodType extends NativeType {

    constructor() {
        super(new Identifier("Period"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if(value instanceof Period)
            return new PeriodValue(value);
        else
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
    }

    checkAdd(context, other, tryReverse) {
        if(other instanceof PeriodType) {
            return this;
        } else {
            return super.checkAdd(this, context, other, tryReverse);
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
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if(other === PeriodType.instance) {
            return this;
        } else {
            return super.checkSubtract(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if(other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if(other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtract(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return super.checkMultiply(this, context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".multiply(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
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


