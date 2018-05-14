var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var PeriodType = require("./PeriodType").PeriodType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var DateType = require("./DateType").DateType;
var TimeType = require("./TimeType").TimeType;
var AnyType = require("./AnyType").AnyType;
var DateTimeValue = require("../value/DateTimeValue").DateTimeValue;
var Identifier = require("../grammar/Identifier").Identifier;
var getTypeName = require("../javascript/JavaScriptUtils").getTypeName;

function DateTimeType()  {
	NativeType.call(this, new Identifier("DateTime"));
	return this;
}

DateTimeType.prototype = Object.create(NativeType.prototype);
DateTimeType.prototype.constructor = DateTimeType;

DateTimeType.instance = new DateTimeType();

DateTimeType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
	if(value.date!=undefined && value.tzOffset!=undefined) {
        return new DateTimeValue(value.date, value.tzOffset);
    } else if (getTypeName(value)=='Date') {
        return new DateTimeValue(value, 0);
    } else {
        return value; // TODO for now
    }
};

DateTimeType.prototype.checkAdd = function(context, other, tryReverse) {
	if (other instanceof PeriodType) {
		return this;
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

DateTimeType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof PeriodType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareAdd.call(this, context, other, tryReverse, left, right);
};

DateTimeType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".addPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileAdd.call(this, context, other, tryReverse, left, right);
};

DateTimeType.prototype.checkSubtract = function(context, other) {
	if (other instanceof PeriodType) {
		return this;
	} else if(other instanceof DateTimeType) {
		return PeriodType.instance;
	} else {
		return NativeType.prototype.checkSubtract.call(this, context, other);
	}
};

DateTimeType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if (other instanceof PeriodType || other instanceof DateTimeType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareSubtract.call(this, context, other, left, right);
};

DateTimeType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".subtractPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else if (other instanceof DateTimeType) {
        left.transpile(transpiler);
        transpiler.append(".subtractDateTime(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileSubtract.call(this, context, other, left, right);
};


DateTimeType.prototype.checkCompare = function(context, other) {
	if(other instanceof DateTimeType || other instanceof DateType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other);
	}
};

DateTimeType.prototype.declareCompare = function(context, other) {
    // nothing to do
};

DateTimeType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    left.transpile(transpiler);
    transpiler.append(".");
    operator.transpile(transpiler);
    transpiler.append("(");
    right.transpile(transpiler);
    transpiler.append(")");
};

DateTimeType.prototype.checkMember = function(context, name) {
	if ("year"==name) {
		return IntegerType.instance;
	} else if ("month"==name) {
		return IntegerType.instance;
	} else if ("dayOfMonth"==name) {
		return IntegerType.instance;
	} else if ("dayOfYear"==name) {
		return IntegerType.instance;
	} else if ("hour"==name) {
		return IntegerType.instance;
	} else if ("minute"==name) {
		return IntegerType.instance;
	} else if ("second"==name) {
		return IntegerType.instance;
	} else if ("millisecond"==name) {
		return IntegerType.instance;
	} else if ("tzOffset"==name) {
		return IntegerType.instance;
	} else if ("tzName"==name) {
		return TextType.instance;
	} else {
		return NativeType.prototype.checkMember.call(this, context, name);
	}
};


DateTimeType.prototype.declareMember = function(transpiler, name) {
    if (!("year"==name || "month"==name || "dayOfMonth"==name || "dayOfYear"==name || "hour"==name || "minute"==name || "second"==name || "millisecond"==name || "tzOffset"==name || "tzName"==name)) {
        NativeType.prototype.declareMember.call(this, transpiler, name);
    }
};


DateTimeType.prototype.transpileMember = function(transpiler, name) {
    if ("year"==name) {
        transpiler.append("getYear()");
    } else if ("month"==name) {
        transpiler.append("getMonth()");
    } else if ("dayOfMonth"==name) {
        transpiler.append("getDayOfMonth()");
    } else if ("dayOfYear"==name) {
        transpiler.append("getDayOfYear()");
    } else if ("hour"==name) {
        transpiler.append("getHour()");
    } else if ("minute"==name) {
        transpiler.append("getMinute()");
    } else if ("second"==name) {
        transpiler.append("getSecond()");
    } else if ("millisecond"==name) {
        transpiler.append("getMillisecond()");
    } else if ("tzOffset"==name) {
        transpiler.append("getTzOffset()");
    } else if ("tzName"==name) {
        transpiler.append("getTzName()");
    } else {
        NativeType.prototype.transpileMember.call(this, transpiler, name);
    }
};



DateTimeType.prototype.sort = function(context, list, desc) {

    function cmp(o1, o2) {
        return o1.CompareTo(context, o2);
    }

    return this.doSort(context, list, cmp, desc);
};



DateTimeType.prototype.transpileSorted = function(transpiler, key, desc) {
    if(desc)
        transpiler.append("function(o1, o2) { return o1.equals(o2) ? 0 : o1.gt(o2) ? -1 : 1; }");
    else
        transpiler.append("function(o1, o2) { return o1.equals(o2) ? 0 : o1.gt(o2) ? 1 : -1; }");
};


exports.DateTimeType = DateTimeType;
