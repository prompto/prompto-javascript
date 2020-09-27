import NativeType from './NativeType.js'
import { DateTimeType, PeriodType, IntegerType, BooleanType, RangeType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { TimeValue } from '../value/index.js'
import { LocalTime, Range, TimeRange } from '../intrinsic/index.js'

export default class TimeType extends NativeType {
 
    constructor() {
        super(new Identifier("TimeValue"));
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || (other == DateTimeType.instance);
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof LocalTime) {
            return new TimeValue(value);
        } else {
            return value; // TODO for now
        }
    }

    checkAdd(context, other, tryReverse) {
        if (other === PeriodType.instance) {
            return this; // ignore date section
        } else {
            return super.checkAdd(context, other, tryReverse);
        }
    }

    declare(transpiler) {
        transpiler.register(LocalTime);
    }

    transpile(transpiler) {
        transpiler.append('Time');
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
            transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if (other === TimeType.instance) {
            return PeriodType.instance; // ignore date section
        } else if (other === PeriodType.instance) {
            return this; // ignore date section
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === TimeType.instance || other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if (other === TimeType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtractTime(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtractPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkCompare(context, other, section) {
        if (other === TimeType.instance) {
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
        transpiler.append(".");
        operator.transpile(transpiler);
        transpiler.append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkRange(context, other) {
        if (other === TimeType.instance) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === TimeType.instance) {
            transpiler.require(Range);
            transpiler.require(TimeRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler, first, last) {
        transpiler.append("new TimeRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context, section, name) {
        if ("hour" == name) {
            return IntegerType.instance;
        } else if ("minute" == name) {
            return IntegerType.instance;
        } else if ("second" == name) {
            return IntegerType.instance;
        } else if ("millisecond" == name) {
            return IntegerType.instance;
        } else {
            return super.checkMember(context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if (!("hour"===name || "minute"===name || "second"===name || "millisecond"===name)) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("hour"==name) {
            transpiler.append("getHour()");
        } else if ("minute"==name) {
            transpiler.append("getMinute()");
        } else if ("second"==name) {
            transpiler.append("getSecond()");
        } else if ("millisecond"==name) {
            transpiler.append("getMillisecond()");
        } else {
            super.transpileMember(transpiler, name);
        }
    }

    newRange(left, right) {
        if (left instanceof TimeValue && right instanceof TimeValue) {
            return new TimeRange(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    toString(value) {
        return "'" + value.toString() + "'";
    }
}

TimeType.instance = new TimeType();
