var Literal = require("./Literal").Literal;
var PeriodType = require("../type/PeriodType").PeriodType;
var PeriodValue = require("../value/PeriodValue").PeriodValue;
var parsePeriodLiteral = require("../utils/Utils").parsePeriodLiteral;

function PeriodLiteral(text) {
	Literal.call(this, text, new PeriodValue(parsePeriodLiteral(text.substring(1,text.length-1))));
	return this;
}

PeriodLiteral.prototype = Object.create(Literal.prototype);
PeriodLiteral.prototype.constructor = PeriodLiteral;

PeriodLiteral.prototype.check = function(context) {
	return PeriodType.instance;
};

PeriodLiteral.prototype.transpile = function(transpiler) {
    transpiler.require(parsePeriodLiteral);
    transpiler.append("parsePeriodLiteral(").append(this.text).append(")");
};

exports.PeriodLiteral = PeriodLiteral;

