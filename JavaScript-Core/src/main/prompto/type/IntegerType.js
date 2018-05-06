var CategoryArgument = null;
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

exports.resolve = function() {
    CategoryArgument = require("../argument/CategoryArgument.js").CategoryArgument;
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


IntegerType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return this;
	} else if(other instanceof DecimalType) {
		return other;
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

IntegerType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof IntegerType || other instanceof DecimalType) {
        left.transpile(transpiler);
        transpiler.append(" + ");
        right.transpile(transpiler);
    } else
        return NativeType.prototype.transpileAdd.call(this, context, other, tryReverse, left, right);
};

IntegerType.prototype.checkSubstract = function(context, other) {
	if(other instanceof IntegerType) {
		return this;
	} else if(other instanceof DecimalType) {
		return other;
	} else {
		return NativeType.prototype.checkSubstract.call(this, context, other);
	}
};

IntegerType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return this;
	} else if(other instanceof DecimalType) {
		return other;
	} else if(other instanceof CharacterType) {
		return TextType.instance;
	} else if(other instanceof TextType) {
		return other;
	} else if(other instanceof PeriodType) {
		return other;
	} else if(other instanceof ListType) {
		return other;
	} else {
		return NativeType.prototype.checkMultiply.call(this, context, other, tryReverse);
	}
};


IntegerType.prototype.checkDivide = function(context, other) {
	if(other instanceof IntegerType || other instanceof DecimalType) {
		return DecimalType.instance;
	} else {
		return NativeType.prototype.checkDivide.call(this, context, other);
	}
};

IntegerType.prototype.checkIntDivide = function(context, other) {
	if(other instanceof IntegerType) {
		return this;
	} else {
		return NativeType.prototype.checkIntDivide.call(this, context, other);
	}
};

IntegerType.prototype.checkModulo = function(context, other) {
	if(other instanceof IntegerType) {
		return this;
	} else {
		return NativeType.prototype.checkModulo.call(this, context, other);
	}
};

IntegerType.prototype.checkMinus = function(context) {
	return this;
};

IntegerType.prototype.checkCompare = function(context, other) {
	if(other instanceof IntegerType || other instanceof DecimalType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other);
	}
};


IntegerType.prototype.checkRange = function(context, other) {
	if(other instanceof IntegerType) {
		return new RangeType(this);
	} else {
		return NativeType.prototype.checkRange.call(this, context, other);
	}
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
        new CategoryArgument(TextType.instance, new Identifier("format")));
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
}