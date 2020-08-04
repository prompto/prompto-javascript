var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var DecimalType = require("./DecimalType").DecimalType;
var CharacterType = null;
var ListType = require("./ListType").ListType;
var RangeType = require("./RangeType").RangeType;
var TextType = null;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var IntegerRange = require("../value/IntegerRange").IntegerRange;
var Identifier = require("../grammar/Identifier").Identifier;
var PeriodType = null;

exports.resolve = function() {
	CharacterType = require("./CharacterType").CharacterType;
	TextType = require("./TextType").TextType;
	PeriodType = require("./PeriodType").PeriodType;
}

class IntegerType extends NativeType {

    constructor() {
        super(new Identifier("Integer"));
    }

    isAssignableFrom(context, other) {
        return NativeType.prototype.isAssignableFrom.call(this, context, other)
            || (other == DecimalType.instance);
    }

    declare(transpiler) {
        var isAnInteger = require("../utils/Utils").isAnInteger;
        transpiler.require(isAnInteger);
    }

    transpile(transpiler) {
        transpiler.append('"Integer"');
    }

    checkAdd(context, other, tryReverse) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return other;
        } else {
            return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" + ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context, other) {
        if(other === IntegerType.instance) {
            return this;
        } else if(other === DecimalType.instance) {
            return other;
        } else {
            return NativeType.prototype.checkSubtract.call(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" - ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
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
            return NativeType.prototype.checkMultiply.call(this, context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.transpile(transpiler);
            transpiler.append(" * ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    checkDivide(context, other) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return DecimalType.instance;
        } else {
            return NativeType.prototype.checkDivide.call(this, context, other);
        }
    }

    declareDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareDivide.call(this, transpiler, other, left, right);
    }

    transpileDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance || other === DecimalType.instance) {
            transpiler.append("divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return NativeType.prototype.transpileDivide.call(this, transpiler, other, left, right);
    }

    checkIntDivide(context, other) {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkIntDivide.call(this, context, other);
        }
    }

    declareIntDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareIntDivide.call(this, transpiler, other, left, right);
    }

    transpileIntDivide(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            // TODO check negative values
            transpiler.append("Math.floor(divide(");
            left.transpile(transpiler);
            transpiler.append(", ");
            right.transpile(transpiler);
            transpiler.append("))");
        } else
            return NativeType.prototype.transpileIntDivide.call(this, transpiler, other, left, right);
    }

    checkModulo(context, other) {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return NativeType.prototype.checkModulo.call(this, context, other);
        }
    }

    declareModulo(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareModulo.call(this, transpiler, other, left, right);
    }

    transpileModulo(transpiler, other, left, right) {
        if (other === IntegerType.instance ) {
            // TODO check negative values
            left.transpile(transpiler);
            transpiler.append(" % ");
            right.transpile(transpiler);
        } else
            return NativeType.prototype.transpileModulo.call(this, transpiler, other, left, right);
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

    checkCompare(context, other, section) {
        if(other === IntegerType.instance || other === DecimalType.instance) {
            return BooleanType.instance;
        } else {
            return NativeType.prototype.checkCompare.call(this, context, other, section);
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
            return NativeType.prototype.checkRange.call(this, context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === IntegerType.instance) {
            var module = require("../intrinsic/Range");
            transpiler.require(module.Range);
            transpiler.require(module.IntegerRange);
        } else {
            return NativeType.prototype.declareRange.call(this, transpiler, other);
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
            return new IntegerRange(left, right);
        } else {
            return NativeType.prototype.newRange.call(this, left, right);
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (typeof(value)=='number') {
            return new IntegerValue(value);
        } else {
            return value; // TODO for now
        }
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "format":
                var FormatMethodDeclaration = require("../builtins/IntegerTypeBuiltins").FormatMethodDeclaration;
                return [new FormatMethodDeclaration()];
            default:
                return NativeType.prototype.getMemberMethods.call(context, name);
        }
    }
}

IntegerType.instance = new IntegerType();


exports.IntegerType = IntegerType;
