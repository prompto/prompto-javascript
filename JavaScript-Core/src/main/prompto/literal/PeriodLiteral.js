const Literal = require("./Literal").Literal;
const PeriodType = require("../type/PeriodType").PeriodType;
const PeriodValue = require("../value/PeriodValue").PeriodValue;
const Period = require("../intrinsic/Period").Period;

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

