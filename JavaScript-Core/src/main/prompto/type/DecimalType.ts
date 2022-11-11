import NativeType from './NativeType'
import { IntegerType, BooleanType } from './index'
import {CmpOp, Identifier} from '../grammar'
import {DecimalValue, IValue} from '../value'
import { isADecimal } from '../intrinsic'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {IExpression} from "../expression";


export default class DecimalType extends NativeType {

    static instance = new DecimalType();
    
    constructor() {
        super(new Identifier("Decimal"), TypeFamily.DECIMAL);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(isADecimal);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Decimal"')
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || (other == IntegerType.instance);
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context: Context, section: Section, other: IType): IType {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return this;
        } else {
            return super.checkSubtract(context, section, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return this;
        } else {
            return super.checkMultiply(context, section, other, tryReverse);
        }
    }

    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkDivide(context: Context, section: Section, other: IType): IType {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return this;
        } else {
            return super.checkDivide(context, section, other);
        }
    }

    declareDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            transpiler.append("divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileDivide(transpiler, other, left, right);
    }

    checkIntDivide(context: Context, section: Section, other: IType): IType {
        if(other == IntegerType.instance) {
            return IntegerType.instance;
        } else {
            return super.checkIntDivide(context, section, other);
        }
    }

    declareIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareIntDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance ) {
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return super.transpileIntDivide(transpiler, other, left, right);
    }

    checkModulo(context: Context, section: Section, other: IType): IType {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return this;
        } else {
            return super.checkModulo(context, section, other);
        }
    }

    declareModulo(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return;
        } else {
            return super.declareModulo(transpiler, other, left, right);
        }
    }

    transpileModulo(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" % ");
            right.transpile(transpiler);
        } else
            return super.transpileModulo(transpiler, other, left, right);
    }

    checkMinus(context: Context, section: Section): IType {
        return this;
    }

    declareMinus(transpiler: Transpiler): void {
        // nothing to do
    }

    transpileMinus(transpiler: Transpiler, exp: IExpression): void {
        transpiler.append(" -");
        exp.transpile(transpiler);
    }

    transpileMember(transpiler: Transpiler, member: Identifier) {
        if("text" == member.name)
            transpiler.append("toDecimalString()");
        else
            super.transpileMember(transpiler, member);
    }

    checkCompare(context: Context, section: Section, other: IType): IType {
        if(other instanceof IntegerType || other instanceof DecimalType) {
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
        transpiler.append(" ").append(operator.toString()).append(" ");
        right.transpile(transpiler);
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (typeof(value)=='number') {
            return new DecimalValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }
}


