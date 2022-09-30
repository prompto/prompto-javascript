import NativeType from './NativeType'
import {DateTimeType, PeriodType, IntegerType, BooleanType, RangeType} from './index'
import {CmpOp, Identifier} from '../grammar'
import {TimeValue, TimeRangeValue, IValue} from '../value'
import {LocalTime, Range, TimeRange} from '../intrinsic'
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {TypeFamily} from "../store";

export default class TimeType extends NativeType {

    static instance = new TimeType();
    
    constructor() {
        super(new Identifier("TimeValue"), TypeFamily.TIME);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || (other == DateTimeType.instance);
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (value instanceof LocalTime) {
            return new TimeValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
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

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context: Context, section: Section, other: IType): IType {
        if (other === TimeType.instance) {
            return PeriodType.instance; // ignore date section
        } else if (other === PeriodType.instance) {
            return this; // ignore date section
        } else {
            return super.checkSubtract(context, section, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if (other === TimeType.instance || other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
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

    checkCompare(context: Context, section: Section, other: IType): IType {
        if (other === TimeType.instance) {
            return BooleanType.instance;
        } else {
            return super.checkCompare(context, section, other);
        }
    }

    declareCompare(transpiler: Transpiler, other: IType): void {
        // nothing to do
    }

    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(".");
        operator.transpile(transpiler);
        transpiler.append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkRange(context: Context, section: Section, other: IType): IType {
        if (other === TimeType.instance) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, section, other);
        }
    }

    declareRange(transpiler: Transpiler, other: IType): void {
        if (other === TimeType.instance) {
            transpiler.require(Range);
            transpiler.require(TimeRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler: Transpiler, itemType: IType, first: IExpression, last: IExpression): void {
        transpiler.append("new TimeRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
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

    declareMember(transpiler: Transpiler, member: Identifier): void {
        switch (member.name) {
            case "hour":
            case "minute":
            case "second":
            case "millisecond":
                break;
            default:
                super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
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

    newRange(left: IValue, right: IValue): IValue {
        if (left instanceof TimeValue && right instanceof TimeValue) {
            return new TimeRangeValue(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    toString(value?: IValue) {
        return "'" + value!.toString() + "'";
    }

    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

