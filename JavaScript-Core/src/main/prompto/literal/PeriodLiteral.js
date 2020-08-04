var Literal = require("./Literal").Literal;
var PeriodType = require("../type/PeriodType").PeriodType;
var PeriodValue = require("../value/PeriodValue").PeriodValue;
var Period = require("../intrinsic/Period").Period;

class PeriodLiteral extends Literal {
    constructor(text) {
        super(text, new PeriodValue(Period.parse(text.substring(1,text.length-1))));
        return this;
    }

    check(context) {
        return PeriodType.instance;
    }

    declare(transpiler) {
        transpiler.require(Period);
    }

    transpile(transpiler) {
        transpiler.append("Period.parse(").append(this.text).append(")");
    }
}

exports.PeriodLiteral = PeriodLiteral;

