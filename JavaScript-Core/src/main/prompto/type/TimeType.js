var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var PeriodType = require("./PeriodType").PeriodType;
var IntegerType = require("./IntegerType").IntegerType;
var RangeType = require("./RangeType").RangeType;
var TimeRange = require("../value/TimeRange").TimeRange;
var TimeValue = require("../value/TimeValue").TimeValue;
var Identifier = require("../grammar/Identifier").Identifier;
var DateTimeType = require("./DateTimeType").DateTimeType;
var LocalTime = require("../intrinsic/LocalTime").LocalTime;
var getTypeName = require("../javascript/JavaScriptUtils").getTypeName;

function TimeType()  {
	NativeType.call(this, new Identifier("TimeValue"));
	return this;
}

TimeType.prototype = Object.create(NativeType.prototype);
TimeType.prototype.constructor = TimeType;

TimeType.instance = new TimeType();

TimeType.prototype.declare = function(transpiler) {
    transpiler.require(LocalTime);
};


TimeType.prototype.isAssignableFrom = function(context, other) {
    return NativeType.prototype.isAssignableFrom.call(this, context, other)
        || (other == DateTimeType.instance);
};


TimeType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    if (getTypeName(value)=='LocalTime') {
        return new TimeValue(value);
    } else {
        return value; // TODO for now
    }
};


TimeType.prototype.checkAdd = function(context, other, tryReverse) {
	if (other === PeriodType.instance) {
		return this; // ignore date section
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

TimeType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === PeriodType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


TimeType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === PeriodType.instance) {
        left.transpile(transpiler);
        transpiler.append(".addPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


TimeType.prototype.checkSubtract = function(context, other) {
	if (other === TimeType.instance) {
		return PeriodType.instance; // ignore date section
	} else if (other === PeriodType.instance) {
		return this; // ignore date section
	} else {
		return NativeType.prototype.checkSubtract.call(this, context, other);
	}
};

TimeType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if (other === TimeType.instance || other === PeriodType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
};

TimeType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other === TimeType.instance) {
        left.transpile(transpiler);
        transpiler.append(".subtractTime(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else if (other === PeriodType.instance) {
        left.transpile(transpiler);
        transpiler.append(".subtractPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
};


TimeType.prototype.checkCompare = function(context, other) {
	if (other === TimeType.instance) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other);
	}
};


TimeType.prototype.declareCompare = function(context, other) {
    // nothing to do
};

TimeType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    left.transpile(transpiler);
    transpiler.append(".");
    operator.transpile(transpiler);
    transpiler.append("(");
    right.transpile(transpiler);
    transpiler.append(")");
};


TimeType.prototype.checkRange = function(context, other) {
	if (other === TimeType.instance) {
		return new RangeType(this);
	} else {
		return NativeType.prototype.checkRange.call(this, context, other);
	}
};


TimeType.prototype.declareRange = function(transpiler, other) {
    if(other === TimeType.instance) {
        var module = require("../intrinsic/Range");
        transpiler.require(module.Range);
        transpiler.require(module.TimeRange);
    } else {
        return NativeType.prototype.declareRange.call(this, transpiler, other);
    }
};


TimeType.prototype.transpileRange = function(transpiler, first, last) {
    transpiler.append("new TimeRange(");
    first.transpile(transpiler);
    transpiler.append(",");
    last.transpile(transpiler);
    transpiler.append(")");
};


TimeType.prototype.checkMember = function (context, section, name) {
	if ("hour" == name) {
		return IntegerType.instance;
	} else if ("minute" == name) {
		return IntegerType.instance;
	} else if ("second" == name) {
		return IntegerType.instance;
	} else if ("millisecond" == name) {
		return IntegerType.instance;
	} else {
		return NativeType.prototype.checkMember.call(this, context, section, name);
	}
};


TimeType.prototype.declareMember = function(transpiler, name) {
    if (!("hour"===name || "minute"===name || "second"===name || "millisecond"===name)) {
        NativeType.prototype.declareMember.call(this, transpiler, name);
    }
};


TimeType.prototype.transpileMember = function(transpiler, name) {
    if ("hour"==name) {
        transpiler.append("getHour()");
    } else if ("minute"==name) {
        transpiler.append("getMinute()");
    } else if ("second"==name) {
        transpiler.append("getSecond()");
    } else if ("millisecond"==name) {
        transpiler.append("getMillisecond()");
    } else {
        NativeType.prototype.transpileMember.call(this, transpiler, name);
    }
};


TimeType.prototype.newRange = function(left, right) {
	if (left instanceof TimeValue && right instanceof TimeValue) {
		return new TimeRange(left, right);
	} else {
		return NativeType.prototype.newRange.call(this, left, right);
	}
};


TimeType.prototype.toString = function(value) {
	return "'" + value.toString() + "'";
};


exports.TimeType = TimeType;