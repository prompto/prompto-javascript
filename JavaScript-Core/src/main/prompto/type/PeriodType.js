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

PeriodType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof PeriodType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


PeriodType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".add(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};



PeriodType.prototype.checkSubtract = function(context, other) {
	if(other instanceof PeriodType) {
		return this;
	} else {
		return NativeType.prototype.checkSubtract(this, context, other);
	}
};


PeriodType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if (other instanceof PeriodType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareSubtract.call(this, context, other, left, right);
};


PeriodType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if (other instanceof PeriodType) {
        left.transpile(transpiler);
        transpiler.append(".subtract(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileSubtract.call(this, context, other, left, right);
};

PeriodType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return this;
	} else {
		return NativeType.prototype.checkMultiply(this, transpiler, other, tryReverse);
	}
};


PeriodType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof IntegerType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareMultiply.call(this, context, other, tryReverse, left, right);
};



PeriodType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other instanceof IntegerType) {
        left.transpile(transpiler);
        transpiler.append(".multiply(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileMultiply.call(this, context, other, tryReverse, left, right);
};

PeriodType.prototype.checkMinus = function(context) {
	return this;
};



PeriodType.prototype.transpileMinus = function(transpiler, value) {
    value.transpile(transpiler);
    transpiler.append(".minus()");
};


exports.PeriodType = PeriodType;
