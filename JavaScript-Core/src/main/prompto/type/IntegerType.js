import NativeType from '../../../main/prompto/type/NativeType.ts'
import { DecimalType, TextType, BooleanType, CharacterType, RangeType, ListType, PeriodType } from './index.ts'
import { Identifier } from '../grammar'
import { IntegerValue, IntegerRangeValue } from '../value'
import { FormatMethodDeclaration } from '../../../main/prompto/builtins/IntegerTypeBuiltins.ts'
import { isAnInteger } from '../utils'
import { Range, IntegerRange } from '../intrinsic'
import {TypeFamily} from "../store";

export default class IntegerType extends NativeType {

    constructor() {
        super(new Identifier("Integer"));
        this.family = TypeFamily.INTEGER;
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        return super.isAssignableFrom(context, other)
            || (other === DecimalType.instance);
    }

    declare(transpiler: Transpiler): void {
         transpiler.require(isAnInteger);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Integer"');
    }

    checkAdd(context: Context, section: Section, other: Type, tryReverse: boolean): Type {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return other;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context: Context, other: Type): Type {
        if(other === IntegerType.instance) {
            return this;
        } else if(other === DecimalType.instance) {
            return other;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance) {
            return this;
        } else if(other === DecimalType.instance) {
            return other;
        } else if(other === CharacterType.instance) {
            return TextType.instance;
        } else if(other === TextType.instance) {
            return other;
        } else if(other === PeriodType.instance) {
            return other;
        } else if(other instanceof ListType) {
            return other;
        } else {
            return super.checkMultiply(context, other, tryReverse);
        }
    }

    declareMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkDivide(context: Context, other: Type): Type {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return DecimalType.instance;
        } else {
            return super.checkDivide(context, other);
        }
    }

    declareDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance || other === DecimalType.instance) {
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
            return this;
        } else {
            return super.checkIntDivide(context, other);
        }
    }

    declareIntDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareIntDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance ) {
            // TODO check negative values
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return super.transpileIntDivide(transpiler, other, left, right);
    }

    checkModulo(context: Context, other: Type): Type {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return super.checkModulo(context, other);
        }
    }

    declareModulo(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareModulo(transpiler, other, left, right);
    }

    transpileModulo(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if (other === IntegerType.instance ) {
            // TODO check negative values
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

    checkCompare(context, section, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
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

    checkRange(context, other) {
        if(other === IntegerType.instance) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === IntegerType.instance) {
            transpiler.require(Range);
            transpiler.require(IntegerRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler, first, last) {
        transpiler.append("new IntegerRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    newRange(left, right) {
        if(left instanceof IntegerValue && right instanceof IntegerValue) {
            return new IntegerRangeValue(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (typeof(value)=='number') {
            return new IntegerValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    getMemberMethods(context, id) {
        switch (id.name) {
            case "format":
                return [new FormatMethodDeclaration()];
            default:
                return super.getMemberMethods.call(context, id);
        }
    }
}

IntegerType.instance = new IntegerType();


