var CategoryParameter = null;
var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var DecimalType = require("./DecimalType").DecimalType;
var CharacterType = null;
var ListType = require("./ListType").ListType;
var RangeType = require("./RangeType").RangeType;
var TextType = null;
var AnyType = require("./AnyType").AnyType;
var TextValue = null;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var IntegerRange = require("../value/IntegerRange").IntegerRange;
var Identifier = require("../grammar/Identifier").Identifier;
var PeriodType = null;
var BuiltInMethodDeclaration = null;

exports.resolve = function() {
    CategoryParameter = require("../param/CategoryParameter.js").CategoryParameter;
	CharacterType = require("./CharacterType").CharacterType;
	TextType = require("./TextType").TextType;
	PeriodType = require("./PeriodType").PeriodType;
	TextValue = require("../value/TextValue").TextValue;
    resolveBuiltInMethodDeclaration();
}

function IntegerType()  {
	NativeType.call(this, new Identifier("Integer"));
	return this;
}

IntegerType.prototype = Object.create(NativeType.prototype);
IntegerType.prototype.constructor = IntegerType;

IntegerType.instance = new IntegerType();


IntegerType.prototype.isAssignableFrom = function(context, other) {
    return NativeType.prototype.isAssignableFrom.call(this, context, other)
        || (other == DecimalType.instance);
};


IntegerType.prototype.declare = function(transpiler) {
    var isAnInteger = require("../utils/Utils").isAnInteger;
    transpiler.require(isAnInteger);
};


IntegerType.prototype.transpile = function(transpiler) {
    transpiler.append('"Integer"');
};

IntegerType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other === IntegerType.instance || other === DecimalType.instance) {
		return other;
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

IntegerType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
}


IntegerType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        left.transpile(transpiler);
        transpiler.append(" + ");
        right.transpile(transpiler);
    } else
        return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
};

IntegerType.prototype.checkSubtract = function(context, other) {
	if(other === IntegerType.instance) {
		return this;
	} else if(other === DecimalType.instance) {
		return other;
	} else {
		return NativeType.prototype.checkSubtract.call(this, context, other);
	}
};

IntegerType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
};

IntegerType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        left.transpile(transpiler);
        transpiler.append(" - ");
        right.transpile(transpiler);
    } else
        return NativeType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
};


IntegerType.prototype.checkMultiply = function(context, other, tryReverse) {
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
};


IntegerType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
};


IntegerType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        left.transpile(transpiler);
        transpiler.append(" * ");
        right.transpile(transpiler);
    } else
        return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
};


IntegerType.prototype.checkDivide = function(context, other) {
	if(other === IntegerType.instance || other === DecimalType.instance) {
		return DecimalType.instance;
	} else {
		return NativeType.prototype.checkDivide.call(this, context, other);
	}
};


IntegerType.prototype.declareDivide = function(transpiler, other, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareDivide.call(this, transpiler, other, left, right);
};


IntegerType.prototype.transpileDivide = function(transpiler, other, left, right) {
    if (other === IntegerType.instance || other === DecimalType.instance) {
        transpiler.append("divide(");
        left.transpile(transpiler);
        transpiler.append(", ");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileDivide.call(this, transpiler, other, left, right);
};


IntegerType.prototype.checkIntDivide = function(context, other) {
	if(other === IntegerType.instance) {
		return this;
	} else {
		return NativeType.prototype.checkIntDivide.call(this, context, other);
	}
};


IntegerType.prototype.declareIntDivide = function(transpiler, other, left, right) {
    if (other === IntegerType.instance ) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareIntDivide.call(this, transpiler, other, left, right);
};


IntegerType.prototype.transpileIntDivide = function(transpiler, other, left, right) {
    if (other === IntegerType.instance ) {
        // TODO check negative values
        transpiler.append("Math.floor(divide(");
        left.transpile(transpiler);
        transpiler.append(", ");
        right.transpile(transpiler);
        transpiler.append("))");
    } else
        return NativeType.prototype.transpileIntDivide.call(this, transpiler, other, left, right);
};



IntegerType.prototype.checkModulo = function(context, other) {
	if(other === IntegerType.instance) {
		return this;
	} else {
		return NativeType.prototype.checkModulo.call(this, context, other);
	}
};


IntegerType.prototype.declareModulo = function(transpiler, other, left, right) {
    if (other === IntegerType.instance ) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareModulo.call(this, transpiler, other, left, right);
};



IntegerType.prototype.transpileModulo = function(transpiler, other, left, right) {
    if (other === IntegerType.instance ) {
        // TODO check negative values
        left.transpile(transpiler);
        transpiler.append(" % ");
        right.transpile(transpiler);
    } else
        return NativeType.prototype.transpileModulo.call(this, transpiler, other, left, right);
};

IntegerType.prototype.checkMinus = function(context) {
	return this;
};


IntegerType.prototype.declareMinus = function(transpiler, value) {
    // nothing to do
};


IntegerType.prototype.transpileMinus = function(transpiler, value) {
    transpiler.append(" -");
    value.transpile(transpiler);
};

IntegerType.prototype.checkCompare = function(context, other, section) {
	if(other === IntegerType.instance || other === DecimalType.instance) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other, section);
	}
};



IntegerType.prototype.declareCompare = function(context, other) {
    // nothing to do
};

IntegerType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    left.transpile(transpiler);
    transpiler.append(" ").append(operator.toString()).append(" ");
    right.transpile(transpiler);
};



IntegerType.prototype.checkRange = function(context, other) {
	if(other === IntegerType.instance) {
		return new RangeType(this);
	} else {
		return NativeType.prototype.checkRange.call(this, context, other);
	}
};



IntegerType.prototype.declareRange = function(transpiler, other) {
    if(other === IntegerType.instance) {
        var module = require("../intrinsic/Range");
        transpiler.require(module.Range);
        transpiler.require(module.IntegerRange);
    } else {
        return NativeType.prototype.declareRange.call(this, transpiler, other);
    }
};


IntegerType.prototype.transpileRange = function(transpiler, first, last) {
    transpiler.append("new IntegerRange(");
    first.transpile(transpiler);
    transpiler.append(",");
    last.transpile(transpiler);
    transpiler.append(")");
};


IntegerType.prototype.newRange = function(left, right) {
	if(left instanceof IntegerValue && right instanceof IntegerValue) {
		return new IntegerRange(left, right);
	} else {
		return NativeType.prototype.newRange.call(this, left, right);
	}
};

IntegerType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
	if (typeof(value)=='number') {
		return new IntegerValue(value);
	} else {
		return value; // TODO for now
	}
};

IntegerType.prototype.getMemberMethods = function(context, name) {
    switch (name) {
        case "format":
            return [new FormatMethodDeclaration()];
		default:
            return NativeType.prototype.getMemberMethods.call(context, name);
    }
};

exports.IntegerType = IntegerType;

function FormatMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "format",
        new CategoryParameter(TextType.instance, new Identifier("format")));
    return this;
}

function resolveBuiltInMethodDeclaration() {
    BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;

    FormatMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    FormatMethodDeclaration.prototype.constructor = FormatMethodDeclaration;

    FormatMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        var format = context.getValue(new Identifier("format")).getStorableData();
        value = this.format(value, format);
        return new TextValue(value);
    };

    FormatMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };

    FormatMethodDeclaration.prototype.format = function(value, format) {
        // TODO support more than leading 0's
        value = "000000000000" + value;
        return value.substr(value.length - format.length);
    };

    FormatMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("formatInteger(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    };
}