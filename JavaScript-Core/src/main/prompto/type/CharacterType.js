var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var CharacterValue = null;
var RangeType = require("./RangeType").RangeType;
var CharacterRange = require("../value/CharacterRange").CharacterRange;
var Identifier = require("../grammar/Identifier").Identifier;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;

exports.resolve = () => {
    CharacterValue = require("../value/CharacterValue").CharacterValue;
};

class CharacterType extends NativeType {
    constructor() {
        super(new Identifier("Character"));
        return this;
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

    checkMember(context, section, name) {
        if ("codePoint"==name) {
            return IntegerType.instance;
        } else {
            return NativeType.prototype.checkMember.call(this, context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if ("codePoint"!==name) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("codePoint"==name) {
            transpiler.append("charCodeAt(0)");
        } else {
            super.transpileMember(transpiler, name);
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
        return NativeType.prototype.checkMultiply.apply(this, context, other, tryReverse);
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".repeat(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    checkCompare(context, other, section) {
        if(other instanceof CharacterType || other instanceof TextType) {
            return BooleanType.instance;
        }
        return NativeType.prototype.checkCompare.apply(this, context, other, section);
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
            return NativeType.prototype.checkRange.call(this, context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === CharacterType.instance) {
            var module = require("../intrinsic/Range");
            transpiler.require(module.Range);
            transpiler.require(module.IntegerRange);
            transpiler.require(module.CharacterRange);
        } else {
            return NativeType.prototype.declareRange.call(this, transpiler, other);
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
            return new CharacterRange(left, right);
        } else {
            return CharacterType.prototype.newRange.call(this, left, right);
        }
    }
}

CharacterType.instance = new CharacterType();


exports.CharacterType = CharacterType;