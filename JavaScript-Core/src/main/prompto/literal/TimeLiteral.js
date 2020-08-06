const Literal = require("./Literal").Literal;
const TimeType = require("../type/TimeType").TimeType;
const TimeValue = require("../value/TimeValue").TimeValue;
const LocalTime = require("../intrinsic/LocalTime").LocalTime;

class TimeLiteral extends Literal {
    constructor(text) {
        const lt = LocalTime.parse(text.substring(1,text.length-1));
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

