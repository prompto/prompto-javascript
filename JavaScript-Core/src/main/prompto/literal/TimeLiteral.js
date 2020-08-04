var Literal = require("./Literal").Literal;
var TimeType = require("../type/TimeType").TimeType;
var TimeValue = require("../value/TimeValue").TimeValue;
var LocalTime = require("../intrinsic/LocalTime").LocalTime;

class TimeLiteral extends Literal {
    constructor(text) {
        var lt = LocalTime.parse(text.substring(1,text.length-1));
        super(text, new TimeValue(lt));
        return this;
    }

    check(context) {
        return TimeType.instance;
    }

    declare(transpiler) {
        transpiler.require(LocalTime);
    }

    transpile(transpiler) {
        transpiler.append("LocalTime.parse(").append(this.text).append(")");
    }
}

exports.TimeLiteral = TimeLiteral;

