import NativeType from './NativeType'
import { DecimalType, TextType, BooleanType, CharacterType, RangeType, ListType, PeriodType } from './index'
import {CmpOp, Identifier} from '../grammar'
import {IntegerValue, IntegerRangeValue, IValue} from '../value'
import { FormatMethodDeclaration } from '../builtins/IntegerTypeBuiltins'
import { isAnInteger } from '../utils'
import {Range, IntegerRange, Type} from '../intrinsic'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {IExpression} from "../expression";
import IType from "./IType";
import {IMethodDeclaration} from "../declaration";

export default class IntegerType extends NativeType {

    static instance = new IntegerType();
    
    constructor() {
        super(new Identifier("Integer"), TypeFamily.INTEGER);
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        return super.isAssignableFrom(context, other)
            || (other == DecimalType.instance);
    }

    declare(transpiler: Transpiler): void {
         transpiler.require(isAnInteger);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Integer"');
    }

    checkAdd(context: Context, section: Section, other: Type, tryReverse: boolean): Type {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return other;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context: Context, section: Section, other: Type): Type {
        if(other == IntegerType.instance) {
            return this;
        } else if(other == DecimalType.instance) {
            return other;
        } else {
            return super.checkSubtract(context, section, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareSubtract(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return super.transpileSubtract(transpiler, other, left, right);
    }

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other == IntegerType.instance) {
            return this;
        } else if(other == DecimalType.instance) {
            return other;
        } else if(other == CharacterType.instance) {
            return TextType.instance;
        } else if(other == TextType.instance) {
            return other;
        } else if(other == PeriodType.instance) {
            return other;
        } else if(other instanceof ListType) {
            return other;
        } else {
            return super.checkMultiply(context, section, other, tryReverse);
        }
    }

    declareMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkDivide(context: Context, section: Section, other: Type): Type {
        if(other == IntegerType.instance || other == DecimalType.instance) {
            return DecimalType.instance;
        } else {
            return super.checkDivide(context, section, other);
        }
    }

    declareDivide(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance || other == DecimalType.instance) {
            transpiler.append("divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileDivide(transpiler, other, left, right);
    }

    checkIntDivide(context: Context, section: Section, other: Type): Type {
        if(other == IntegerType.instance) {
            return this;
        } else {
            return super.checkIntDivide(context, section, other);
        }
    }

    declareIntDivide(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareIntDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance ) {
            // TODO check negative values
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return super.transpileIntDivide(transpiler, other, left, right);
    }

    checkModulo(context: Context, section: Section, other: Type): Type {
        if(other == IntegerType.instance) {
            return this;
        } else {
            return super.checkModulo(context, section, other);
        }
    }

    declareModulo(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareModulo(transpiler, other, left, right);
    }

    transpileModulo(transpiler: Transpiler, other: Type, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance ) {
            // TODO check negative values
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

    transpileMinus(transpiler: Transpiler, value: IExpression): void {
        transpiler.append(" -");
        value.transpile(transpiler);
    }

    checkCompare(context: Context, section: Section, other: IType): IType {
        if(other == IntegerType.instance || other == DecimalType.instance) {
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

    checkRange(context: Context, section: Section, other: IType): IType {
        if(other == IntegerType.instance) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, section, other);
        }
    }

    declareRange(transpiler: Transpiler, other: IType): void {
        if(other == IntegerType.instance) {
            transpiler.require(Range);
            transpiler.require(IntegerRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler: Transpiler, itemType: IType, first: IExpression, last: IExpression): void {
        transpiler.append("new IntegerRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    newRange(left: IValue, right: IValue): IValue {
        if(left instanceof IntegerValue && right instanceof IntegerValue) {
            return new IntegerRangeValue(left, right);
        } else {
            return super.newRange(left, right);
        }
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (typeof(value)=='number') {
            return new IntegerValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        switch (id.name) {
            case "format":
                return new Set<IMethodDeclaration>([new FormatMethodDeclaration()]);
            default:
                return super.getMemberMethods(context, id);
        }
    }
}



