var Literal = require("./Literal").Literal;
var DateTimeType = require("../type/DateTimeType").DateTimeType;
var DateTimeValue = require("../value/DateTimeValue").DateTimeValue;

function DateTimeLiteral(text) {
	Literal.call(this, text, DateTimeValue.Parse(text.substring(1,text.length-1)));
	return this;
}

DateTimeLiteral.prototype = Object.create(Literal.prototype);
DateTimeLiteral.prototype.constructor = DateTimeLiteral;

DateTimeLiteral.prototype.check = function(context) {
	return DateTimeType.instance;
};

exports.DateTimeLiteral = DateTimeLiteral;
