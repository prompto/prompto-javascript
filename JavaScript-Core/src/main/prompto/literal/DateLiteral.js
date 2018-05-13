var Literal = require("./Literal").Literal;
var DateType = require("../type/DateType").DateType;
var DateValue = require("../value/DateValue").DateValue;
var LocalDate = require("../intrinsic/LocalDate").LocalDate;

function DateLiteral(text) {
	Literal.call(this, text, new DateValue(LocalDate.parse(text.substring(1,text.length-1))));
	return this;
}

DateLiteral.prototype = Object.create(Literal.prototype);
DateLiteral.prototype.constructor = DateLiteral;

DateLiteral.prototype.check = function(context) {
	return DateType.instance;
};

DateLiteral.prototype.declare = function(transpiler) {
    transpiler.require(LocalDate);
};

DateLiteral.prototype.transpile = function(transpiler) {
    transpiler.append("LocalDate.parse(").append(this.text).append(")");
};

exports.DateLiteral = DateLiteral;
