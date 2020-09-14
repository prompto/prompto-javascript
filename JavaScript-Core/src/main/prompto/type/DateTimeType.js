import NativeType from "./NativeType"
import { DateType, TimeType, PeriodType, IntegerType, BooleanType, TextType } from "./index"
import { Identifier } from "../grammar/index"
import { DateTimeValue } from "../value/index"
import { LocalDate, LocalTime, DateTime } from "../intrinsic/index"

export default class DateTimeType extends NativeType {

    constructor() {
        super(new Identifier("DateTime"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof Date)
            value = new DateTime(value, 0);
        if(value instanceof DateTime)
            return new DateTimeValue(value);
        else
            return value; // TODO for now
    }

    checkAdd(context, other, tryReverse) {
        if (other === PeriodType.instance) {
            return this;
        } else {
            return super.checkAdd(context, other, tryReverse);
        }
    }

    declare(transpiler) {
        transpiler.register(DateTime);
    }

    transpile(transpiler) {
        transpiler.append('DateTime');
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context, other) {
        if (other === PeriodType.instance) {
            return this;
        } else if(other === DateTimeType.instance) {
            return PeriodType.instance;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === PeriodType.instance || other === DateTimeType.instance) {
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
        } else if (other === DateTimeType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtractDateTime(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkCompare(context, other, section) {
        if(other === DateTimeType.instance || other instanceof DateType) {
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

    checkMember(context, section, name) {
        if ("year"===name) {
            return IntegerType.instance;
        } else if ("month"===name) {
            return IntegerType.instance;
        } else if ("dayOfMonth"===name) {
            return IntegerType.instance;
        } else if ("dayOfYear"===name) {
            return IntegerType.instance;
        } else if ("hour"===name) {
            return IntegerType.instance;
        } else if ("minute"===name) {
            return IntegerType.instance;
        } else if ("second"===name) {
            return IntegerType.instance;
        } else if ("millisecond"===name) {
            return IntegerType.instance;
        } else if ("tzOffset"===name) {
            return IntegerType.instance;
        } else if ("tzName"===name) {
            return TextType.instance;
        } else if ("date"===name) {
            return DateType.instance;
        } else if ("time"===name) {
            return TimeType.instance;
        } else {
            return super.checkMember(context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if("date"===name) {
            transpiler.register(LocalDate);
        } else if("time"===name) {
            transpiler.register(LocalTime);
        } else if (!("year"===name || "month"===name || "dayOfMonth"===name || "dayOfYear"===name || "hour"===name || "minute"===name || "second"===name || "millisecond"===name || "tzOffset"===name || "tzName"===name)) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("year"===name) {
            transpiler.append("getYear()");
        } else if ("month"===name) {
            transpiler.append("getMonth()");
        } else if ("dayOfMonth"===name) {
            transpiler.append("getDayOfMonth()");
        } else if ("dayOfYear"===name) {
            transpiler.append("getDayOfYear()");
        } else if ("hour"===name) {
            transpiler.append("getHour()");
        } else if ("minute"===name) {
            transpiler.append("getMinute()");
        } else if ("second"===name) {
            transpiler.append("getSecond()");
        } else if ("millisecond"===name) {
            transpiler.append("getMillisecond()");
        } else if ("tzOffset"===name) {
            transpiler.append("getTzOffset()");
        } else if ("tzName"===name) {
            transpiler.append("getTzName()");
        } else if ("date"===name) {
            transpiler.append("getDate()");
        } else if ("time"===name) {
            transpiler.append("getTime()");
        } else {
            super.transpileMember(transpiler, name);
        }
    }
}

DateTimeType.instance = new DateTimeType();


