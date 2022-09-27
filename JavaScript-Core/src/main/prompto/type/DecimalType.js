import NativeType from '../../../main/prompto/type/NativeType.ts'
import { IntegerType, BooleanType } from '../type'
import { Identifier } from '../grammar'
import { DecimalValue } from '../value'
import { isADecimal } from '../utils'


export default class DecimalType extends NativeType {

    constructor() {
        super(new Identifier("Decimal"));
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(isADecimal);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Decimal"')
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || (other === IntegerType.instance);
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): Type {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context: Context, other: Type): Type {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkMultiply(context, other, tryReverse);
        }
    }

    declareMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkDivide(context: Context, other: Type): Type {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkDivide(context, other);
        }
    }

    declareDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            transpiler.append("divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileDivide(transpiler, other, left, right);
    }

    checkIntDivide(context: Context, other: Type): Type {
        if(other === IntegerType.instance) {
            return IntegerType.instance;
        } else {
            return super.checkIntDivide(context, other);
        }
    }

    declareIntDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareIntDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance ) {
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return super.transpileIntDivide(transpiler, other, left, right);
    }

    checkModulo(context: Context, other: Type): Type {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return this;
        } else {
            return super.checkModulo(context, other);
        }
    }

    declareModulo(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return;
        } else {
            return super.declareModulo(transpiler, other, left, right);
        }
    }

    transpileModulo(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" % ");
            right.transpile(transpiler);
        } else
            return super.transpileModulo(transpiler, other, left, right);
    }

    checkMinus(context) {
        return this;
    }

    declareMinus(transpiler, value) {
        // nothing to do
    }

    transpileMinus(transpiler, value) {
        transpiler.append(" -");
        value.transpile(transpiler);
    }

    transpileMember(transpiler, name) {
        if("text" === name)
            transpiler.append("toDecimalString()");
        else
            super.transpileMember(transpiler, name);
    }

    checkCompare(context, section, other) {
        if(other instanceof IntegerType || other instanceof DecimalType) {
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
        transpiler.append(" ").append(operator.toString()).append(" ");
        right.transpile(transpiler);
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (typeof(value)=='number') {
            return new DecimalValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }
}

DecimalType.instance = new DecimalType();

