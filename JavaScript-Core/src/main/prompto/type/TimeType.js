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

class TimeType extends NativeType {
 
    constructor() {
        super(new Identifier("TimeValue"));
    }

    isAssignableFrom(context, other) {
        return NativeType.prototype.isAssignableFrom.call(this, context, other)
            || (other == DateTimeType.instance);
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof LocalTime) {
            return new TimeValue(value);
        } else {
            return value; // TODO for now
        }
    }

    checkAdd(context, other, tryReverse) {
        if (other === PeriodType.instance) {
            return this; // ignore date section
        } else {
            return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    declare(transpiler) {
        transpiler.register(LocalTime);
    }

    transpile(transpiler) {
        transpiler.append('Time');
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance) {
            left.transpile(transpiler);
            transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if (other === TimeType.instance) {
            return PeriodType.instance; // ignore date section
        } else if (other === PeriodType.instance) {
            return this; // ignore date section
        } else {
            return NativeType.prototype.checkSubtract.call(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === TimeType.instance || other === PeriodType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
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
    }

    checkCompare(context, other, section) {
        if (other === TimeType.instance) {
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
        transpiler.append(".");
        operator.transpile(transpiler);
        transpiler.append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkRange(context, other) {
        if (other === TimeType.instance) {
            return new RangeType(this);
        } else {
            return NativeType.prototype.checkRange.call(this, context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === TimeType.instance) {
            var module = require("../intrinsic/Range");
            transpiler.require(module.Range);
            transpiler.require(module.TimeRange);
        } else {
            return NativeType.prototype.declareRange.call(this, transpiler, other);
        }
    }

    transpileRange(transpiler, first, last) {
        transpiler.append("new TimeRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context, section, name) {
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
    }

    declareMember(transpiler, section, name) {
        if (!("hour"===name || "minute"===name || "second"===name || "millisecond"===name)) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("hour"==name) {
            transpiler.append("getHour()");
        } else if ("minute"==name) {
            transpiler.append("getMinute()");
        } else if ("second"==name) {
            transpiler.append("getSecond()");
        } else if ("millisecond"==name) {
            transpiler.append("getMillisecond()");
        } else {
            super.transpileMember(transpiler, name);
        }
    }

    newRange(left, right) {
        if (left instanceof TimeValue && right instanceof TimeValue) {
            return new TimeRange(left, right);
        } else {
            return NativeType.prototype.newRange.call(this, left, right);
        }
    }

    toString(value) {
        return "'" + value.toString() + "'";
    }
}

TimeType.instance = new TimeType();


exports.TimeType = TimeType;