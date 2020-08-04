var Literal = require("./Literal").Literal;
var DateType = require("../type/DateType").DateType;
var DateValue = require("../value/DateValue").DateValue;
var LocalDate = require("../intrinsic/LocalDate").LocalDate;

class DateLiteral extends Literal {
    constructor(text) {
        super(text, new DateValue(LocalDate.parse(text.substring(1,text.length-1))));
        return this;
    }

    check(context) {
        return DateType.instance;
    }

    declare(transpiler) {
        transpiler.require(LocalDate);
    }

    transpile(transpiler) {
        transpiler.append("LocalDate.parse(").append(this.text).append(")");
    }
}

exports.DateLiteral = DateLiteral;
