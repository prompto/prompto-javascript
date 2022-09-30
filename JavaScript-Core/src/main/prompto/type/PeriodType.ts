import NativeType from './NativeType'
import {IntegerType} from '../type'
import {Identifier} from '../grammar'
import {IValue, PeriodValue} from '../value'
import {Period} from '../intrinsic'
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {TypeFamily} from "../store";
import {IExpression} from "../expression";


export default class PeriodType extends NativeType {

    static instance = new PeriodType();
    
    constructor() {
        super(new Identifier("Period"), TypeFamily.PERIOD);
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (value instanceof Period)
            return new PeriodValue(value);
        else
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if (other instanceof PeriodType) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(Period);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('Period')
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
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context: Context, section: Section, other: IType): IType {
        if (other === PeriodType.instance) {
            return this;
        } else {
            return super.checkSubtract(context, section, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if (other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".subtract(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if (other === IntegerType.instance) {
            return this;
        } else {
            return super.checkMultiply(context, section, other, tryReverse);
        }
    }

    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".multiply(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkMinus(context: Context, section: Section): IType {
        return this;
    }

    declareMinus(transpiler: Transpiler): void {
        // nothing to do
    }

    transpileMinus(transpiler: Transpiler, exp: IExpression): void {
        exp.transpile(transpiler);
        transpiler.append(".minus()");
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
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

    declareMember(transpiler: Transpiler, member: Identifier): void {
        switch (member.name) {
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
                super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
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

    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}



