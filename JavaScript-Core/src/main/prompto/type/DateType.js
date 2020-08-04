var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var PeriodType = require("./PeriodType").PeriodType;
var TimeType = require("./TimeType").TimeType;
var DateTimeType = require("./DateTimeType").DateTimeType;
var IntegerType = require("./IntegerType").IntegerType;
var RangeType = require("./RangeType").RangeType;
var DateRange = require("../value/DateRange").DateRange;
var DateValue = require("../value/DateValue").DateValue;
var Identifier = require("../grammar/Identifier").Identifier;
var LocalDate = require("../intrinsic/LocalDate").LocalDate;
var DateTime = require("../intrinsic/DateTime").DateTime;

class DateType extends NativeType {
 
    constructor() {
        super(new Identifier("Date"));
    }

    isAssignableFrom(context, other) {
        return NativeType.prototype.isAssignableFrom.call(this, context, other)
            || (other == DateTimeType.instance);
    }

    checkAdd(context, other, tryReverse) {
        if (other === PeriodType.instance) {
            return this; // ignore time section
        } else if(other === TimeType.instance) {
            return DateTimeType.instance;
        } else {
            return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof LocalDate) {
            return new DateValue(value);
        } else {
            return value; // TODO for now
        }
    }

    declare(transpiler) {
        transpiler.register(LocalDate);
    }

    transpile(transpiler) {
        transpiler.append('Date');
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance || other == TimeType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
            if(other == TimeType.instance)
                transpiler.register(DateTime);
        } else
            return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other === PeriodType.instance || other == TimeType.instance) {
            left.transpile(transpiler);
            if(other == TimeType.instance)
                transpiler.append(".addTime(");
            else
                transpiler.append(".addPeriod(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }

    checkSubtract(context, other) {
        if (other === PeriodType.instance) {
            return this; // ignore time section
        } else if (other === DateType.instance) {
            return PeriodType.instance;
        } else {
            return NativeType.prototype.checkSubtract.call(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if (other === PeriodType.instance || other === DateType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareSubtract.call(this, transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
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
    }

    checkCompare(context, other, section) {
        if (other === DateType.instance || other instanceof DateTimeType) {
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
        if (other === DateType.instance) {
            return new RangeType(this);
        } else {
            return NativeType.prototype.checkRange.call(this, context, other);
        }
    }

    declareRange(transpiler, other) {
        if(other === DateType.instance) {
            var module = require("../intrinsic/Range");
            transpiler.require(module.Range);
            transpiler.require(module.DateRange);
        } else {
            return NativeType.prototype.declareRange.call(this, transpiler, other);
        }
    }

    transpileRange(transpiler, first, last) {
        transpiler.append("new DateRange(");
        first.transpile(transpiler);
        transpiler.append(",");
        last.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context, section, name) {
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
    }

    declareMember(transpiler, section, name) {
        if (!("year"==name || "month"==name || "dayOfMonth"==name || "dayOfYear"==name)) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("year"==name) {
            transpiler.append("getYear()");
        } else if ("month"==name) {
            transpiler.append("getMonth()");
        } else if ("dayOfMonth"==name) {
            transpiler.append("getDayOfMonth()");
        } else if ("dayOfYear"==name) {
            transpiler.append("getDayOfYear()");
        } else {
            super.transpileMember(transpiler, name);
        }
    }

    newRange(left, right) {
        if (left instanceof DateValue && right instanceof DateValue) {
            return new DateRange(left, right);
        } else {
            return NativeType.prototype.newRange.call(this, left, right);
        }
    }
}

DateType.instance = new DateType();


exports.DateType = DateType;
