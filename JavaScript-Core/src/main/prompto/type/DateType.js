import NativeType from './NativeType.js'
import { DateTimeType, TimeType, PeriodType, IntegerType, BooleanType, RangeType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { DateValue, DateRangeValue } from '../value/index.js'
import { LocalDate, Range, DateRange, DateTime } from '../intrinsic/index.js'

export default class DateType extends NativeType {

    constructor() {
        super(new Identifier("Date"));
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || (other === DateTimeType.instance);
    }

    checkAdd(context, section, other, tryReverse) {
        if (other === PeriodType.instance) {
            return this; // ignore time section
        } else if(other === TimeType.instance) {
            return DateTimeType.instance;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof LocalDate) {
            return new DateValue(value);
        } else {
            return value; // TODO for now
        }
    }

    declare(transpiler) {
        transpiler.register(LocalDate);
    }

    transpile(transpiler) {
        transpiler.append('Date');
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance || other === TimeType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
            if(other === TimeType.instance)
                transpiler.register(DateTime);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance || other === TimeType.instance) {
            left.transpile(transpiler);
            if(other === TimeType.instance)
                transpiler.append(".addTime(");
            else
                transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context, other) {
        if (other === PeriodType.instance) {
            return this; // ignore time section
        } else if (other === DateType.instance) {
            return PeriodType.instance;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === PeriodType.instance || other === DateType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtractPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else if (other === DateType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtractDate(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkCompare(context, section, other) {
        if (other === DateType.instance || other instanceof DateTimeType) {
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
        if (other === DateType.instance) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === DateType.instance) {
            transpiler.require(Range);
            transpiler.require(DateRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler, first, last) {
        transpiler.append("new DateRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context, section, name) {
        if ("year" === name) {
            return IntegerType.instance;
        } else if ("month" === name) {
            return IntegerType.instance;
        } else if ("dayOfMonth" === name) {
            return IntegerType.instance;
        } else if ("dayOfYear" === name) {
            return IntegerType.instance;
        } else {
            return super.checkMember(context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if (!("year" === name || "month" === name || "dayOfMonth" === name || "dayOfYear" === name)) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("year" === name) {
            transpiler.append("getYear()");
        } else if ("month" === name) {
            transpiler.append("getMonth()");
        } else if ("dayOfMonth" === name) {
            transpiler.append("getDayOfMonth()");
        } else if ("dayOfYear" === name) {
            transpiler.append("getDayOfYear()");
        } else {
            super.transpileMember(transpiler, name);
        }
    }

    newRange(left, right) {
        if (left instanceof DateValue && right instanceof DateValue) {
            return new DateRangeValue(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    transpileJsxCode(transpiler, expression = expression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

DateType.instance = new DateType();


