import NativeType from './NativeType'
import {DateTimeType, TimeType, PeriodType, IntegerType, BooleanType, RangeType} from './index'
import {CmpOp, Identifier} from '../grammar'
import {DateValue, DateRangeValue, IValue} from '../value'
import {LocalDate, Range, DateRange, DateTime} from '../intrinsic'
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {TypeFamily} from "../store";

export default class DateType extends NativeType {

    static instance = new DateType();

    constructor() {
        super(new Identifier("Date"), TypeFamily.DATE);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || (other === DateTimeType.instance);
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if (other === PeriodType.instance) {
            return this; // ignore time section
        } else if (other === TimeType.instance) {
            return DateTimeType.instance;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (value instanceof LocalDate) {
            return new DateValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(LocalDate);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('Date');
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === PeriodType.instance || other === TimeType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
            if (other === TimeType.instance)
                transpiler.register(DateTime);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === PeriodType.instance || other === TimeType.instance) {
            left.transpile(transpiler);
            if (other === TimeType.instance)
                transpiler.append(".addTime(");
            else
                transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context: Context, section: Section, other: IType): IType {
        if (other === PeriodType.instance) {
            return this; // ignore time section
        } else if (other === DateType.instance) {
            return PeriodType.instance;
        } else {
            return super.checkSubtract(context, section, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if (other === PeriodType.instance || other === DateType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
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

    checkCompare(context: Context, section: Section, other: IType): IType {
        if (other === DateType.instance || other instanceof DateTimeType) {
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
        if (other === DateType.instance) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, section, other);
        }
    }

    declareRange(transpiler: Transpiler, other: IType): void {
        if (other === DateType.instance) {
            transpiler.require(Range);
            transpiler.require(DateRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler: Transpiler, itemType: IType, first: IExpression, last: IExpression): void {
        transpiler.append("new DateRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        switch (id.name) {
            case "year":
            case "month":
            case "dayOfMonth":
            case "dayOfYear":
                return IntegerType.instance;
            default:
                return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        switch (member.name) {
            case "year":
            case "month":
            case "dayOfMonth":
            case "dayOfYear":
                break;
            default:
                super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        switch (id.name) {
            case "year":
                transpiler.append("getYear()");
                break;
            case "month":
                transpiler.append("getMonth()");
                break;
            case "dayOfMonth":
                transpiler.append("getDayOfMonth()");
                break;
            case "dayOfYear":
                transpiler.append("getDayOfYear()");
                break;
            default:
                super.transpileMember(transpiler, id);
        }
    }

    newRange(left: IValue, right: IValue): IValue {
        if (left instanceof DateValue && right instanceof DateValue) {
            return new DateRangeValue(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    transpileJsxCode(transpiler: Transpiler, expression: IExpression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}



