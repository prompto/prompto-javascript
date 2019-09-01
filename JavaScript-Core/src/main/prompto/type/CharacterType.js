var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var CharacterValue = null;
var RangeType = require("./RangeType").RangeType;
var CharacterRange = require("../value/CharacterRange").CharacterRange;
var Identifier = require("../grammar/Identifier").Identifier;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;

exports.resolve = function() {
    CharacterValue = require("../value/CharacterValue").CharacterValue;
};

function CharacterType()  {
	NativeType.call(this, new Identifier("Character"));
	return this;
}

CharacterType.prototype = Object.create(NativeType.prototype);
CharacterType.prototype.constructor = CharacterType;

CharacterType.instance = new CharacterType();


CharacterType.prototype.declare = function(transpiler) {
    // nothing to do
};

CharacterType.prototype.nativeCast = function(context, value) {
    if(value.type instanceof TextType && value.value.length>=1)
        return new CharacterValue(value.value.substring(0, 1));
    else
        throw new InvalidDataError("Cannot convert " + value.toString() + " to CharacterValue");
};


CharacterType.prototype.checkMember = function(context, section, name) {
    if ("codePoint"==name) {
        return IntegerType.instance;
    } else {
        return NativeType.prototype.checkMember.call(this, context, section, name);
    }
};


CharacterType.prototype.declareMember = function(transpiler, section, name) {
    if ("codePoint"!==name) {
        NativeType.prototype.declareMember.call(this, transpiler, section, name);
    }
};



CharacterType.prototype.transpileMember = function(transpiler, name) {
    if ("codePoint"==name) {
        transpiler.append("charCodeAt(0)");
    } else {
        NativeType.prototype.transpileMember.call(this, transpiler, name);
    }
};


CharacterType.prototype.checkAdd = function(context, other, tryReverse) {
	return TextType.instance;
};


CharacterType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    left.declare(transpiler);
    right.declare(transpiler);
};


CharacterType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    // can add anything to text
    left.transpile(transpiler);
    transpiler.append(" + ");
    right.transpile(transpiler);
};


CharacterType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other === IntegerType.instance) {
		return TextType.instance;
	}
	return NativeType.prototype.checkMultiply.apply(this, context, other, tryReverse);
};


CharacterType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
};

CharacterType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance) {
        left.transpile(transpiler);
        transpiler.append(".repeat(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
};


CharacterType.prototype.checkCompare = function(context, other, section) {
	if(other instanceof CharacterType || other instanceof TextType) {
		return BooleanType.instance;
	}
	return NativeType.prototype.checkCompare.apply(this, context, other, section);
};

CharacterType.prototype.declareCompare = function(context, other) {
    // nothing to do
};

CharacterType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    left.transpile(transpiler);
    transpiler.append(" ").append(operator.toString()).append(" ");
    right.transpile(transpiler);
};

CharacterType.prototype.checkRange = function(context, other) {
	if(other instanceof CharacterType) {
		return new RangeType(this);
	} else {
		return NativeType.prototype.checkRange.call(this, context, other);
	}
};


CharacterType.prototype.declareRange = function(transpiler, other) {
    if(other === CharacterType.instance) {
        var module = require("../intrinsic/Range");
        transpiler.require(module.Range);
        transpiler.require(module.IntegerRange);
        transpiler.require(module.CharacterRange);
    } else {
        return NativeType.prototype.declareRange.call(this, transpiler, other);
    }
};


CharacterType.prototype.transpileRange = function(transpiler, first, last) {
    transpiler.append("new CharacterRange(");
    first.transpile(transpiler);
    transpiler.append(",");
    last.transpile(transpiler);
    transpiler.append(")");
};


CharacterType.prototype.newRange = function(left, right) {
	if(left instanceof CharacterValue && right instanceof CharacterValue) {
		return new CharacterRange(left, right);
	} else {
		return CharacterType.prototype.newRange.call(this, left, right);
	}
};


exports.CharacterType = CharacterType;