var NativeType = require("./NativeType").NativeType;
var IntegerType = require("./IntegerType").IntegerType;
var Identifier = require("../grammar/Identifier").Identifier;

function PeriodType()  {
	NativeType.call(this, new Identifier("Period"));
	return this;
}

PeriodType.prototype = Object.create(NativeType.prototype);
PeriodType.prototype.constructor = PeriodType;

PeriodType.instance = new PeriodType();

PeriodType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other instanceof PeriodType) {
		return this;
	} else {
		return NativeType.prototype.checkAdd(this, context, other, tryReverse);
	}
};

PeriodType.prototype.checkSubstract = function(context, other) {
	if(other instanceof PeriodType) {
		return this;
	} else {
		return NativeType.prototype.checkSubstract(this, context, other);
	}
};

PeriodType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return this;
	} else {
		return NativeType.prototype.checkMultiply(this, context, other, tryReverse);
	}
};


PeriodType.prototype.checkMinus = function(context) {
	return this;
};

exports.PeriodType = PeriodType;
