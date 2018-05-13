var Literal = require("./Literal").Literal;
var DateTimeType = require("../type/DateTimeType").DateTimeType;
var DateTimeValue = require("../value/DateTimeValue").DateTimeValue;
var DateTime = require("../intrinsic/DateTime").DateTime;

function DateTimeLiteral(text) {
    var dt = DateTime.parse(text.substring(1,text.length-1));
	Literal.call(this, text, new DateTimeValue(dt));
	return this;
}

DateTimeLiteral.prototype = Object.create(Literal.prototype);
DateTimeLiteral.prototype.constructor = DateTimeLiteral;

DateTimeLiteral.prototype.check = function(context) {
	return DateTimeType.instance;
};

DateTimeLiteral.prototype.declare = function(transpiler) {
    transpiler.require(DateTime);
};


DateTimeLiteral.prototype.transpile = function(transpiler) {
    transpiler.append("DateTime.parse(").append(this.text).append(")");
};

exports.DateTimeLiteral = DateTimeLiteral;
