var Value = require("./Value").Value;
var IntegerValue = null; // circular dependency
var DecimalType = null;

exports.resolve = function() {
	IntegerValue = require("./IntegerValue").IntegerValue;
    DecimalType = require("../type/DecimalType").DecimalType;
};

function DecimalValue(value) {
	Value.call(this, DecimalType.instance);
	this.value = value;
	return this;
}

DecimalValue.prototype = Object.create(Value.prototype);
DecimalValue.prototype.constructor = DecimalValue;

DecimalValue.Parse = function(text) {
	return new DecimalValue(parseFloat(text));
};

DecimalValue.prototype.toString = function() {
	// mimic 0.0######
	if(this.value == Math.floor(this.value)) {
		return Number(this.value).toFixed(1);
	} else {
		return this.value.toFixed(1);
	}
};

/*jshint bitwise:false*/
DecimalValue.prototype.IntegerValue = function() {
	return Math.floor(this.value);
};

DecimalValue.prototype.DecimalValue = function() {
	return this.value;
};


DecimalValue.prototype.getStorableData = function() {
    return this.value;
};

DecimalValue.prototype.Add = function(context, value) {
	if (value instanceof IntegerValue) {
		return new DecimalValue(this.value + value.IntegerValue());
	} else if (value instanceof DecimalValue) {
		return new DecimalValue(this.value + value.DecimalValue());
	} else {
		throw new SyntaxError("Illegal: DecimalValue + " + typeof(value));
	}
};

DecimalValue.prototype.Subtract = function(context, value) {
	if (value instanceof IntegerValue) {
		return new DecimalValue(this.value - value.IntegerValue());
	} else if (value instanceof DecimalValue) {
		return new DecimalValue(this.value - value.DecimalValue());
	} else {
		throw new SyntaxError("Illegal: DecimalValue - " + typeof(value));
	}
};

DecimalValue.prototype.Multiply = function(context, value) {
	if (value instanceof IntegerValue) {
		return new DecimalValue(this.value * value.IntegerValue());
	} else if (value instanceof DecimalValue) {
		return new DecimalValue(this.value * value.DecimalValue());
	} else {
		throw new SyntaxError("Illegal: DecimalValue * " + typeof(value));
	}
};

DecimalValue.prototype.Divide = function(context, value) {
	if (value instanceof IntegerValue || value instanceof DecimalValue) {
		if (value.DecimalValue() == 0.0) {
			throw new DivideByZeroError();
		} else {
			return new DecimalValue(this.DecimalValue() / value.DecimalValue());
		}
	} else {
		throw new SyntaxError("Illegal: DecimalValue / " + typeof(value));
	}
};

DecimalValue.prototype.IntDivide = function(context, value) {
    if (value instanceof IntegerValue) {
        if (value.IntegerValue() == 0) {
            throw new DivideByZeroError();
        } else {
            return new IntegerValue(this.DecimalValue() / value.IntegerValue());
        }
    } else {
        throw new SyntaxError("Illegal: DecimalValue \\ " + typeof(value));
    }
};

DecimalValue.prototype.Modulo = function(context, value) {
    if (value instanceof IntegerValue || value instanceof DecimalValue) {
        if (value.DecimalValue() == 0.0) {
            throw new DivideByZeroError();
        } else {
            return new DecimalValue(this.DecimalValue() % value.DecimalValue());
        }
    } else {
        throw new SyntaxError("Illegal: DecimalValue % " + typeof(value));
    }
};

DecimalValue.prototype.Minus = function(context) {
	return new DecimalValue(-this.value);
};

DecimalValue.prototype.CompareTo = function(context, value) {
	if (value instanceof IntegerValue || value instanceof DecimalValue) {
		return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
	} else {
		throw new SyntaxError("Illegal comparison: IntegerValue and " + typeof(value));
	}
};
/*


@Override
public Object ConvertTo(Class<?> type) {
	return value;
}

*/

DecimalValue.prototype.equals = function(obj) {
	if (obj instanceof IntegerValue || obj instanceof DecimalValue) {
		return this.value == obj.value;
	} else {
		return false;
	}
};

exports.DecimalValue = DecimalValue;

