import NativeType from './NativeType'
import { IntegerType, BooleanType, TextType, RangeType } from './index'
import { InvalidDataError } from '../error'
import {CmpOp, Identifier} from '../grammar'
import {CharacterValue, CharacterRangeValue, IValue, TextValue} from '../value'
import { Range, CharacterRange, IntegerRange } from "../intrinsic"
import {Context, Transpiler} from "../runtime";
import {TypeFamily} from "../store";
import {Section} from "../parser";
import IType from "./IType";
import {IExpression} from "../expression";

export default class CharacterType extends NativeType {

    static instance = new CharacterType();
    
    constructor() {
        super(new Identifier("Character"), TypeFamily.CHARACTER);
    }

    nativeCast(context: Context, value: IValue) {
        if(value instanceof TextValue && value.value.length >= 1)
            return new CharacterValue(value.value.substring(0, 1));
        else
            throw new InvalidDataError("Cannot convert " + value.toString() + " to CharacterValue");
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        if ("codePoint" == id.name) {
            return IntegerType.instance;
        } else {
            return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        if ("codePoint" != member.name) {
            super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        if ("codePoint" == id.name) {
            transpiler.append("charCodeAt(0)");
        } else {
            super.transpileMember(transpiler, id);
        }
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        return TextType.instance;
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        left.declare(transpiler);
        right.declare(transpiler);
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        // can add anything to text
        left.transpile(transpiler);
        transpiler.append(" + ");
        right.transpile(transpiler);
    }

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other == IntegerType.instance) {
            return TextType.instance;
        }
        return super.checkMultiply(context, section, other, tryReverse);
    }

    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other == IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".repeat(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkCompare(context: Context, section: Section, other: IType): IType {
        if(other instanceof CharacterType || other instanceof TextType) {
            return BooleanType.instance;
        }
        return super.checkCompare(context, section, other);
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
        if(other instanceof CharacterType) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, section, other);
        }
    }

    declareRange(transpiler: Transpiler, other: IType): void {
        if(other == CharacterType.instance) {
            transpiler.require(Range);
            transpiler.require(IntegerRange);
            transpiler.require(CharacterRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler: Transpiler, itemType: IType, first: IExpression, last: IExpression): void {
        transpiler.append("new CharacterRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    newRange(left: IValue, right: IValue): IValue {
        if(left instanceof CharacterValue && right instanceof CharacterValue) {
            return new CharacterRangeValue(left, right);
        } else {
            return  super.newRange(left, right);
        }
    }
}
