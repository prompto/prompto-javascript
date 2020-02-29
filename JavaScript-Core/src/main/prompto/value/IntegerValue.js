var Value = require("./Value").Value;
var DecimalValue = require("./DecimalValue").DecimalValue;
var IntegerType = null;
var DivideByZeroError = require("../error/DivideByZeroError").DivideByZeroError;

exports.resolve = function() {
    IntegerType = require("../type/IntegerType").IntegerType;
};

function IntegerValue(value) {
	Value.call(this, IntegerType.instance);
	this.value = value>0 ? Math.floor(value) : Math.ceil(value);
	return this;
}

IntegerValue.prototype = Object.create(Value.prototype);
IntegerValue.prototype.constructor = IntegerValue;

IntegerValue.Parse = function(text) {
	return new IntegerValue(parseInt(text));
};


IntegerValue.prototype.toString = function() {
	return this.value.toString();
};

IntegerValue.prototype.getStorableData = function() {
    return this.value;
};


IntegerValue.prototype.convertToJavaScript = function() {
	return this.value;
};


IntegerValue.prototype.IntegerValue = function() {
	return this.value;
};

IntegerValue.prototype.DecimalValue = function() {
	return this.value * 1.0;
};

IntegerValue.prototype.Add = function(context, value) {
	if (value instanceof IntegerValue) {
		return new IntegerValue(this.value + value.value);
	} else if (value instanceof DecimalValue) {
		return new DecimalValue(value.DecimalValue() + this.value);
	} else {
		throw new SyntaxError("Illegal: IntegerValue + " + typeof(value));
	}
};

IntegerValue.prototype.Subtract = function(context, value) {
	if (value instanceof IntegerValue) {
		return new IntegerValue(this.value - value.value);
	} else if (value instanceof DecimalValue) {
		return new DecimalValue(this.value - value.DecimalValue());
	} else {
		throw new SyntaxError("Illegal: IntegerValue - " + typeof(value));
	}
};

IntegerValue.prototype.Multiply = function(context, value) {
	if (value instanceof IntegerValue) {
		return new IntegerValue(this.value * value.value);
	} else if (value instanceof DecimalValue) {
		return new DecimalValue(value.value * this.value);
	} else if (value.Multiply) {
		return value.Multiply(context, this);
	} else {
		throw new SyntaxError("Illegal: IntegerValue * " + typeof(value));
	}
};


IntegerValue.prototype.Divide = function(context, value) {
	if (value instanceof IntegerValue || value instanceof DecimalValue) {
		if (value.DecimalValue() == 0.0) {
			throw new DivideByZeroError();
		} else {
			return new DecimalValue(this.DecimalValue() / value.DecimalValue());
		}
	} else {
		throw new SyntaxError("Illegal: IntegerValue / " + typeof(value));
	}
};

IntegerValue.prototype.IntDivide = function(context, value) {
	if (value instanceof IntegerValue) {
		if (value.IntegerValue() == 0) {
			throw new DivideByZeroError();
		} else {
			return new IntegerValue(this.IntegerValue() / value.IntegerValue());
		}
	} else {
		throw new SyntaxError("Illegal: IntegerValue \\ " + typeof(value));
	}
};

IntegerValue.prototype.Modulo = function(context, value) {
	if (value instanceof IntegerValue) {
		if (value.IntegerValue() == 0) {
			throw new DivideByZeroError();
		} else {
			return new IntegerValue(this.IntegerValue() % value.IntegerValue());
		}
	} else {
		throw new SyntaxError("Illegal: IntegerValue \\ " + typeof(value));
	}
};

IntegerValue.prototype.Minus = function(context) {
	return new IntegerValue(-this.value);
};

IntegerValue.prototype.cmp = function(obj) {
	return this.value > obj.IntegerValue() ? 1 : this.value == obj.IntegerValue() ? 0 : -1 ;
};

IntegerValue.prototype.compareToValue = function(context, value) {
	if (value instanceof IntegerValue || value instanceof DecimalValue) {
		return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
	} else {
		throw new SyntaxError("Illegal comparison: IntegerValue and " + typeof(value));
	}
};


IntegerValue.prototype.equals = function(obj) {
	if (obj instanceof IntegerValue) {
		return this.value == obj.value;
	} else if (obj instanceof DecimalValue) {
		return this.value == obj.value;
	} else {
		return false;
	}
};

IntegerValue.prototype.toJson = function(context, json, instanceId, fieldName, withType, binaries) {
    if(Array.isArray(json))
        json.push(this.value);
    else
        json[fieldName] = this.value;
};

exports.IntegerValue = IntegerValue;
