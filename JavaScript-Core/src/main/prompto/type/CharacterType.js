import NativeType from './NativeType.js'
import { IntegerType, BooleanType, TextType, RangeType } from './index.js'
import { InvalidDataError } from '../error/index.js'
import { Identifier } from '../grammar/index.js'
import { CharacterValue, CharacterRangeValue } from '../value/index.js'
import { Range, CharacterRange, IntegerRange } from "../intrinsic/index.js"

export default class CharacterType extends NativeType {

    constructor() {
        super(new Identifier("Character"));
    }

    declare(transpiler) {
        // nothing to do
    }

    nativeCast(context, value) {
        if(value.type instanceof TextType && value.value.length>=1)
            return new CharacterValue(value.value.substring(0, 1));
        else
            throw new InvalidDataError("Cannot convert " + value.toString() + " to CharacterValue");
    }

    checkMember(context, section, id) {
        if ("codePoint" === id.name) {
            return IntegerType.instance;
        } else {
            return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        if ("codePoint" !== id.name) {
            super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler, id) {
        if ("codePoint" === id.name) {
            transpiler.append("charCodeAt(0)");
        } else {
            super.transpileMember(transpiler, id);
        }
    }

    checkAdd(context, other, tryReverse) {
        return TextType.instance;
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        left.declare(transpiler);
        right.declare(transpiler);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        // can add anything to text
        left.transpile(transpiler);
        transpiler.append(" + ");
        right.transpile(transpiler);
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance) {
            return TextType.instance;
        }
        return super.checkMultiply.apply(this, context, other, tryReverse);
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".repeat(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkCompare(context, section, other) {
        if(other instanceof CharacterType || other instanceof TextType) {
            return BooleanType.instance;
        }
        return super.checkCompare.apply(this, context, section, other);
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
        if(other instanceof CharacterType) {
            return new RangeType(this);
        } else {
            return super.checkRange(context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === CharacterType.instance) {
            transpiler.require(Range);
            transpiler.require(IntegerRange);
            transpiler.require(CharacterRange);
        } else {
            return super.declareRange(transpiler, other);
        }
    }

    transpileRange(transpiler, first, last) {
        transpiler.append("new CharacterRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    newRange(left, right) {
        if(left instanceof CharacterValue && right instanceof CharacterValue) {
            return new CharacterRangeValue(left, right);
        } else {
            return  super.newRange(left, right);
        }
    }
}

CharacterType.instance = new CharacterType();
