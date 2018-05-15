var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var PeriodType = require("./PeriodType").PeriodType;
var IntegerType = require("./IntegerType").IntegerType;
var RangeType = require("./RangeType").RangeType;
var AnyType = require("./AnyType").AnyType;
var DateRange = require("../value/DateRange").DateRange;
var DateValue = require("../value/DateValue").DateValue;
var Identifier = require("../grammar/Identifier").Identifier;
var DateTimeType = require("./DateTimeType").DateTimeType;
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
	if (other instanceof PeriodType) {
		return this; // ignore time section
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};


DateType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof PeriodType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareAdd.call(this, context, other, tryReverse, left, right);
};

DateType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".addPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileAdd.call(this, context, other, tryReverse, left, right);
};

DateType.prototype.checkSubtract = function(context, other) {
	if (other instanceof PeriodType) {
		return this; // ignore time section
	} else if (other instanceof DateType) {
		return PeriodType.instance;
	} else {
		return NativeType.prototype.checkSubtract.call(this, context, other);
	}
};


DateType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if (other instanceof PeriodType || other instanceof DateType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareSubtract.call(this, context, other, left, right);
};

DateType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".subtractPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else if (other instanceof DateType) {
        left.transpile(transpiler);
        transpiler.append(".subtractDate(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileSubtract.call(this, context, other, left, right);
};

DateType.prototype.checkCompare = function(context, other) {
	if (other instanceof DateType || other instanceof DateTimeType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other);
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
	if (other instanceof DateType) {
		return new RangeType(this);
	} else {
		return Nativetype.prototype.checkRange.call(this, context, other);
	}
};


DateType.prototype.declareRange = function(transpiler, other) {
    if(other instanceof DateType) {
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


DateType.prototype.checkMember = function(context, name) {
	if ("year"==name) {
		return IntegerType.instance;
	} else if ("month"==name) {
		return IntegerType.instance;
	} else if ("dayOfMonth"==name) {
		return IntegerType.instance;
	} else if ("dayOfYear"==name) {
		return IntegerType.instance;
	} else {
		return NativeType.prototype.checkMember.call(this, context, name);
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


DateType.prototype.transpileSorted = function(transpiler, key, desc) {
    if(desc)
        transpiler.append("function(o1, o2) { return o1.equals(o2) ? 0 : o1.gt(o2) ? -1 : 1; }");
    else
        transpiler.append("function(o1, o2) { return o1.equals(o2) ? 0 : o1.gt(o2) ? 1 : -1; }");
};

exports.DateType = DateType;
