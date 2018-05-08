var Literal = require("./Literal").Literal;
var TimeType = require("../type/TimeType").TimeType;
var TimeValue = require("../value/TimeValue").TimeValue;
var LocalTime = require("../intrinsic/LocalTime").LocalTime;

function TimeLiteral(text) {
	var lt = LocalTime.parse(text.substring(1,text.length-1));
	Literal.call(this, text, new TimeValue(lt));
	return this;
}

TimeLiteral.prototype = Object.create(Literal.prototype);
TimeLiteral.prototype.constructor = TimeLiteral;

TimeLiteral.prototype.check = function(context) {
	return TimeType.instance;
};

TimeLiteral.prototype.transpile = function(transpiler) {
    transpiler.require(LocalTime);
    transpiler.append("LocalTime.parse(").append(this.text).append(")");
};

exports.TimeLiteral = TimeLiteral;

