import NativeType from './NativeType.js'
import {IntegerType} from './index.js'
import {Identifier} from '../grammar/index.js'
import {PeriodValue} from '../value/index.js'
import {Period} from '../intrinsic/index.js'


export default class PeriodType extends NativeType {

    constructor() {
        super(new Identifier("Period"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof Period)
            return new PeriodValue(value);
        else
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
    }

    checkAdd(context, section, other, tryReverse) {
        if (other instanceof PeriodType) {
            return this;
        } else {
            return super.checkAdd(this, context, section, other, tryReverse);
        }
    }

    declare(transpiler) {
        transpiler.register(Period);
    }

    transpile(transpiler) {
        transpiler.append('Period')
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if (other === PeriodType.instance) {
            return this;
        } else {
            return super.checkSubtract(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtract(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if (other === IntegerType.instance) {
            return this;
        } else {
            return super.checkMultiply(this, context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
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

    checkMember(context, section, id) {
        switch (id.name) {
            case "years":
            case "months":
            case "weeks":
            case "days":
            case "hours":
            case "minutes":
            case "seconds":
            case "milliseconds":
                return IntegerType.instance;
            default:
                return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        switch (id.name) {
            case "years":
            case "months":
            case "weeks":
            case "days":
            case "hours":
            case "minutes":
            case "seconds":
            case "milliseconds":
                break;
            default:
                super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler, id) {
        switch (id.name) {
            case "years":
            case "months":
            case "weeks":
            case "days":
            case "hours":
            case "minutes":
            case "seconds":
            case "milliseconds":
                transpiler.append(id.name);
                break;
            default:
                super.transpileMember(transpiler, id);
        }
    }

    transpileJsxCode(transpiler, expression = expression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

PeriodType.instance = new PeriodType();


