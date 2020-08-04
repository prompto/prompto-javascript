var Literal = require("./Literal").Literal;
var DateTimeType = require("../type/DateTimeType").DateTimeType;
var DateTimeValue = require("../value/DateTimeValue").DateTimeValue;
var DateTime = require("../intrinsic/DateTime").DateTime;

class DateTimeLiteral extends Literal {
    constructor(text) {
        var dt = DateTime.parse(text.substring(1,text.length-1));
        super(text, new DateTimeValue(dt));
        return this;
    }

    check(context) {
        return DateTimeType.instance;
    }

    declare(transpiler) {
        transpiler.require(DateTime);
    }

    transpile(transpiler) {
        transpiler.append("DateTime.parse(").append(this.text).append(")");
    }
}

exports.DateTimeLiteral = DateTimeLiteral;
