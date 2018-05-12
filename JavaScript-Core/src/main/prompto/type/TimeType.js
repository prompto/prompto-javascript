var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var PeriodType = require("./PeriodType").PeriodType;
var IntegerType = require("./IntegerType").IntegerType;
var RangeType = require("./RangeType").RangeType;
var TimeRange = require("../value/TimeRange").TimeRange;
var TimeValue = require("../value/TimeValue").TimeValue;
var Identifier = require("../grammar/Identifier").Identifier;
var DateTimeType = require("./DateTimeType").DateTimeType;

function TimeType()  {
	NativeType.call(this, new Identifier("TimeValue"));
	return this;
}

TimeType.prototype = Object.create(NativeType.prototype);
TimeType.prototype.constructor = TimeType;

TimeType.instance = new TimeType();

TimeType.prototype.isAssignableFrom = function(context, other) {
    return NativeType.prototype.isAssignableFrom.call(this, context, other)
        || (other == DateTimeType.instance);
};

TimeType.prototype.checkAdd = function(context, other, tryReverse) {
	if (other instanceof PeriodType) {
		return this; // ignore date section
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

TimeType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".addPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


TimeType.prototype.checkSubtract = function(context, other) {
	if (other instanceof TimeType) {
		return PeriodType.instance; // ignore date section
	} else if (other instanceof PeriodType) {
		return this; // ignore date section
	} else {
		return NativeType.prototype.checkSubtract.call(this, context, other);
	}
};

TimeType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other instanceof TimeType) {
        left.transpile(transpiler);
        transpiler.append(".subtractTime(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else if (other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".subtractPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileSubtract.call(this, context, other, left, right);
};

TimeType.prototype.checkCompare = function(context, other) {
	if (other instanceof TimeType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other);
	}
};

TimeType.prototype.checkRange = function(context, other) {
	if (other instanceof TimeType) {
		return new RangeType(this);
	} else {
		return NativeType.prototype.checkRange.call(this, context, other);
	}
};

TimeType.prototype.checkMember = function (context, name) {
	if ("hour" == name) {
		return IntegerType.instance;
	} else if ("minute" == name) {
		return IntegerType.instance;
	} else if ("second" == name) {
		return IntegerType.instance;
	} else if ("millisecond" == name) {
		return IntegerType.instance;
	} else {
		return NativeType.prototype.checkMember.call(this, context, name);
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