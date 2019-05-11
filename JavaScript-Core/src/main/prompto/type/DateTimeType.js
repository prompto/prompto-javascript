var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var PeriodType = require("./PeriodType").PeriodType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var DateType = null;
var TimeType = null;
var AnyType = require("./AnyType").AnyType;
var DateTime = require("../intrinsic/DateTime").DateTime;
var DateTimeValue = require("../value/DateTimeValue").DateTimeValue;
var Identifier = require("../grammar/Identifier").Identifier;
var LocalDate = require("../intrinsic/LocalDate").LocalDate;
var LocalTime = require("../intrinsic/LocalTime").LocalTime;


exports.resolve = function() {
    DateType = require("./DateType").DateType;
    TimeType = require("./TimeType").TimeType;
};


function DateTimeType()  {
	NativeType.call(this, new Identifier("DateTime"));
	return this;
}

DateTimeType.prototype = Object.create(NativeType.prototype);
DateTimeType.prototype.constructor = DateTimeType;

DateTimeType.instance = new DateTimeType();

DateTimeType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    if (value instanceof Date)
        value = new DateTime(value, 0);
    if(value instanceof DateTime)
        return new DateTimeValue(value);
    else
        return value; // TODO for now
};

DateTimeType.prototype.checkAdd = function(context, other, tryReverse) {
	if (other === PeriodType.instance) {
		return this;
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

DateTimeType.prototype.declare = function(transpiler) {
    transpiler.register(DateTime);
};


DateTimeType.prototype.transpile = function(transpiler) {
    transpiler.append('DateTime');
};


DateTimeType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === PeriodType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
};

DateTimeType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if (other === PeriodType.instance) {
        left.transpile(transpiler);
        transpiler.append(".addPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
};

DateTimeType.prototype.checkSubtract = function(context, other) {
	if (other === PeriodType.instance) {
		return this;
	} else if(other === DateTimeType.instance) {
		return PeriodType.instance;
	} else {
		return NativeType.prototype.checkSubtract.call(this, context, other);
	}
};

DateTimeType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if (other === PeriodType.instance || other === DateTimeType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
};

DateTimeType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other === PeriodType.instance) {
        left.transpile(transpiler);
        transpiler.append(".subtractPeriod(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else if (other === DateTimeType.instance) {
        left.transpile(transpiler);
        transpiler.append(".subtractDateTime(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
};


DateTimeType.prototype.checkCompare = function(context, other) {
	if(other === DateTimeType.instance || other instanceof DateType) {
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

DateTimeType.prototype.checkMember = function(context, section, name) {
	if ("year"===name) {
		return IntegerType.instance;
	} else if ("month"===name) {
		return IntegerType.instance;
	} else if ("dayOfMonth"===name) {
		return IntegerType.instance;
	} else if ("dayOfYear"===name) {
		return IntegerType.instance;
	} else if ("hour"===name) {
		return IntegerType.instance;
	} else if ("minute"===name) {
		return IntegerType.instance;
	} else if ("second"===name) {
		return IntegerType.instance;
	} else if ("millisecond"===name) {
		return IntegerType.instance;
	} else if ("tzOffset"===name) {
		return IntegerType.instance;
	} else if ("tzName"===name) {
		return TextType.instance;
    } else if ("date"===name) {
        return DateType.instance;
    } else if ("time"===name) {
        return TimeType.instance;
    } else {
		return NativeType.prototype.checkMember.call(this, context, section, name);
	}
};


DateTimeType.prototype.declareMember = function(transpiler, name) {
    if("date"===name) {
        transpiler.register(LocalDate);
    } else if("time"===name) {
        transpiler.register(LocalTime);
    } else if (!("year"===name || "month"===name || "dayOfMonth"===name || "dayOfYear"===name || "hour"===name || "minute"===name || "second"===name || "millisecond"===name || "tzOffset"===name || "tzName"===name)) {
        NativeType.prototype.declareMember.call(this, transpiler, name);
    }
};


DateTimeType.prototype.transpileMember = function(transpiler, name) {
    if ("year"===name) {
        transpiler.append("getYear()");
    } else if ("month"===name) {
        transpiler.append("getMonth()");
    } else if ("dayOfMonth"===name) {
        transpiler.append("getDayOfMonth()");
    } else if ("dayOfYear"===name) {
        transpiler.append("getDayOfYear()");
    } else if ("hour"===name) {
        transpiler.append("getHour()");
    } else if ("minute"===name) {
        transpiler.append("getMinute()");
    } else if ("second"===name) {
        transpiler.append("getSecond()");
    } else if ("millisecond"===name) {
        transpiler.append("getMillisecond()");
    } else if ("tzOffset"===name) {
        transpiler.append("getTzOffset()");
    } else if ("tzName"===name) {
        transpiler.append("getTzName()");
    } else if ("date"===name) {
        transpiler.append("getDate()");
    } else if ("time"===name) {
        transpiler.append("getTime()");
    } else {
        NativeType.prototype.transpileMember.call(this, transpiler, name);
    }
};


exports.DateTimeType = DateTimeType;
