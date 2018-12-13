var Literal = require("./Literal").Literal;
var PeriodType = require("../type/PeriodType").PeriodType;
var PeriodValue = require("../value/PeriodValue").PeriodValue;
var Period = require("../intrinsic/Period").Period;

function PeriodLiteral(text) {
	Literal.call(this, text, new PeriodValue(Period.parse(text.substring(1,text.length-1))));
	return this;
}

PeriodLiteral.prototype = Object.create(Literal.prototype);
PeriodLiteral.prototype.constructor = PeriodLiteral;

PeriodLiteral.prototype.check = function(context) {
	return PeriodType.instance;
};


PeriodLiteral.prototype.declare = function(transpiler) {
    transpiler.require(Period);
};


PeriodLiteral.prototype.transpile = function(transpiler) {
	transpiler.append("Period.parse(").append(this.text).append(")");
};

exports.PeriodLiteral = PeriodLiteral;

