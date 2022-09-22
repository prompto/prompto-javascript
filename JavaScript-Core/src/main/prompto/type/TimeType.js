import NativeType from './NativeType.ts'
import {DateTimeType, PeriodType, IntegerType, BooleanType, RangeType} from './index.ts'
import {Identifier} from '../grammar'
import {TimeValue, TimeRangeValue} from '../value'
import {LocalTime, Range, TimeRange} from '../intrinsic'

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
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    checkAdd(context, section, other, tryReverse) {
        if (other === PeriodType.instance) {
            return this; // ignore date section
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(LocalTime);
    }

    transpile(transpiler: Transpiler): void {
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

    checkCompare(context, section, other) {
        if (other === TimeType.instance) {
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
        if (other === TimeType.instance) {
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

    checkMember(context, section, id) {
        switch (id.name) {
            case "hour":
            case "minute":
            case "second":
            case "millisecond":
                return IntegerType.instance;
            default:
                return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        switch (id.name) {
            case "hour":
            case "minute":
            case "second":
            case "millisecond":
                break;
            default:
                super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler, id) {
        switch (id.name) {
            case "hour":
                transpiler.append("getHour()");
                break;
            case "minute":
                transpiler.append("getMinute()");
                break;
            case "second":
                transpiler.append("getSecond()");
                break;
            case "millisecond":
                transpiler.append("getMillisecond()");
                break;
            default:
                super.transpileMember(transpiler, id);
        }
    }

    newRange(left, right) {
        if (left instanceof TimeValue && right instanceof TimeValue) {
            return new TimeRangeValue(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    toString(value) {
        return "'" + value.toString() + "'";
    }

    transpileJsxCode(transpiler, expression = expression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

TimeType.instance = new TimeType();
