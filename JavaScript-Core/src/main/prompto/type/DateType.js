var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var PeriodType = require("./PeriodType").PeriodType;
var IntegerType = require("./IntegerType").IntegerType;
var RangeType = require("./RangeType").RangeType;
var DateRange = require("../value/DateRange").DateRange;
var DateValue = require("../value/DateValue").DateValue;
var Identifier = require("../grammar/Identifier").Identifier;
var DateTimeType = require("./DateTimeType").DateTimeType;
var CharacterType = require("./CharacterType").CharacterType;
var LocalDate = require("../intrinsic/LocalDate").LocalDate;

function DateType()  {
	NativeType.call(this, new Identifier("Date"));
	return this;
}

DateType.prototype = Object.create(NativeType.prototype);
DateType.prototype.constructor = DateType;

DateType.instance = new DateType();

DateType.prototype.declare = function(transpiler) {
    transpiler.require(LocalDate);
};


DateType.prototype.isAssignableFrom = function(context, other) {
	return NativeType.prototype.isAssignableFrom.call(this, context, other)
        || (other == DateTimeType.instance);
};

DateType.prototype.checkAdd = function(context, other, tryReverse) {
	if (other === PeriodType.instance) {
		return this; // ignore time section
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};


DateType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    if (value instanceof LocalDate) {
        return new DateValue(value);
    } else {
        return value; // TODO for now
    }
};


DateType.prototype.declare = function(transpiler) {
    transpiler.register(LocalDate);
};


DateType.prototype.transpile = function(transpiler) {
    transpiler.append('Date');
};


DateType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === PeriodType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
};

DateType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === PeriodType.instance) {
        left.transpile(transpiler);
        transpiler.append(".addPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
};

DateType.prototype.checkSubtract = function(context, other) {
	if (other === PeriodType.instance) {
		return this; // ignore time section
	} else if (other === DateType.instance) {
		return PeriodType.instance;
	} else {
		return NativeType.prototype.checkSubtract.call(this, context, other);
	}
};


DateType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if (other === PeriodType.instance || other === DateType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
};

DateType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other === PeriodType.instance) {
        left.transpile(transpiler);
        transpiler.append(".subtractPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else if (other === DateType.instance) {
        left.transpile(transpiler);
        transpiler.append(".subtractDate(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
};

DateType.prototype.checkCompare = function(context, other, section) {
	if (other === DateType.instance || other instanceof DateTimeType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other, section);
	}
};


DateType.prototype.declareCompare = function(context, other) {
    // nothing to do
};

DateType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    left.transpile(transpiler);
    transpiler.append(".");
    operator.transpile(transpiler);
    transpiler.append("(");
    right.transpile(transpiler);
    transpiler.append(")");
};

DateType.prototype.checkRange = function(context, other) {
    if(other instanceof CharacterType) {
        return new RangeType(this);
    } else {
        return NativeType.prototype.checkRange.call(this, context, other);
    }
};


DateType.prototype.checkRange = function(context, other) {
	if (other === DateType.instance) {
		return new RangeType(this);
	} else {
		return NativeType.prototype.checkRange.call(this, context, other);
	}
};


DateType.prototype.declareRange = function(transpiler, other) {
    if(other === DateType.instance) {
        var module = require("../intrinsic/Range");
        transpiler.require(module.Range);
        transpiler.require(module.DateRange);
    } else {
        return NativeType.prototype.declareRange.call(this, transpiler, other);
    }
};


DateType.prototype.transpileRange = function(transpiler, first, last) {
    transpiler.append("new DateRange(");
    first.transpile(transpiler);
    transpiler.append(",");
    last.transpile(transpiler);
    transpiler.append(")");
};


DateType.prototype.checkMember = function(context, section, name) {
	if ("year"==name) {
		return IntegerType.instance;
	} else if ("month"==name) {
		return IntegerType.instance;
	} else if ("dayOfMonth"==name) {
		return IntegerType.instance;
	} else if ("dayOfYear"==name) {
		return IntegerType.instance;
	} else {
		return NativeType.prototype.checkMember.call(this, context, section, name);
	}
};


DateType.prototype.declareMember = function(transpiler, name) {
    if (!("year"==name || "month"==name || "dayOfMonth"==name || "dayOfYear"==name)) {
        NativeType.prototype.declareMember.call(this, transpiler, name);
    }
};


DateType.prototype.transpileMember = function(transpiler, name) {
    if ("year"==name) {
        transpiler.append("getYear()");
    } else if ("month"==name) {
        transpiler.append("getMonth()");
    } else if ("dayOfMonth"==name) {
        transpiler.append("getDayOfMonth()");
    } else if ("dayOfYear"==name) {
        transpiler.append("getDayOfYear()");
    } else {
        NativeType.prototype.transpileMember.call(this, transpiler, name);
    }
};

DateType.prototype.newRange = function(left, right) {
	if (left instanceof DateValue && right instanceof DateValue) {
		return new DateRange(left, right);
	} else {
		return NativeType.prototype.newRange.call(this, left, right);
	}
};


exports.DateType = DateType;
