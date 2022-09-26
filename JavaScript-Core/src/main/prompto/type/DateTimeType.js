import NativeType from './NativeType.ts'
import {DateType, TimeType, PeriodType, IntegerType, BooleanType, TextType} from '../type'
import {Identifier} from '../grammar'
import {DateTimeValue} from '../value'
import {LocalDate, LocalTime, DateTime} from '../intrinsic'

export default class DateTimeType extends NativeType {

    constructor() {
        super(new Identifier("DateTime"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof Date)
            value = new DateTime(value, 0);
        if (value instanceof DateTime)
            return new DateTimeValue(value);
        else
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
    }

    checkAdd(context: Context, section: Section, other: Type, tryReverse: boolean): Type {
        if (other === PeriodType.instance) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(DateTime);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('DateTime');
    }

    declareAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if (other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context: Context, other: Type): Type {
        if (other === PeriodType.instance) {
            return this;
        } else if (other === DateTimeType.instance) {
            return PeriodType.instance;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === PeriodType.instance || other === DateTimeType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
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

    checkCompare(context, section, other) {
        if (other === DateTimeType.instance || other instanceof DateType) {
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

    checkMember(context: Context, section: Section, id: Identifier): Type {
        switch (id.name) {
            case "year":
            case "month":
            case "dayOfMonth":
            case "dayOfYear":
            case "hour":
            case "minute":
            case "second":
            case "millisecond":
            case "tzOffset":
                return IntegerType.instance;
            case "tzName":
                return TextType.instance;
            case "date":
                return DateType.instance;
            case "time":
                return TimeType.instance;
            default:
                return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        switch (id.name) {
            case "year":
            case "month":
            case "dayOfMonth":
            case "dayOfYear":
            case "hour":
            case "minute":
            case "second":
            case "millisecond":
            case "tzOffset":
                break;
            case "date":
            transpiler.register(LocalDate);
            break;
            case "time":
            transpiler.register(LocalTime);
            break;
            default:
                super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        const name = id.name;
        if ("year" === name) {
            transpiler.append("getYear()");
        } else if ("month" === name) {
            transpiler.append("getMonth()");
        } else if ("dayOfMonth" === name) {
            transpiler.append("getDayOfMonth()");
        } else if ("dayOfYear" === name) {
            transpiler.append("getDayOfYear()");
        } else if ("hour" === name) {
            transpiler.append("getHour()");
        } else if ("minute" === name) {
            transpiler.append("getMinute()");
        } else if ("second" === name) {
            transpiler.append("getSecond()");
        } else if ("millisecond" === name) {
            transpiler.append("getMillisecond()");
        } else if ("tzOffset" === name) {
            transpiler.append("getTzOffset()");
        } else if ("tzName" === name) {
            transpiler.append("getTzName()");
        } else if ("date" === name) {
            transpiler.append("getDate()");
        } else if ("time" === name) {
            transpiler.append("getTime()");
        } else {
            super.transpileMember(transpiler, id);
        }
    }

    transpileJsxCode(transpiler, expression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

DateTimeType.instance = new DateTimeType();


