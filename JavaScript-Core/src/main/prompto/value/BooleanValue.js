var BooleanType = require("../type/BooleanType").BooleanType;
var Value = require("./Value").Value;

function BooleanValue(value) {
	Value.call(this, BooleanType.instance);
	this.value = value;
	return this;
}

BooleanValue.prototype = Object.create(Value.prototype);
BooleanValue.prototype.constructor = BooleanValue;

BooleanValue.TRUE = new BooleanValue(true);
BooleanValue.FALSE = new BooleanValue(false);
BooleanValue.TRUE.not = BooleanValue.FALSE;
BooleanValue.FALSE.not = BooleanValue.TRUE;

BooleanValue.ValueOf = function(value) {
	return value ? BooleanValue.TRUE : BooleanValue.FALSE;
};

BooleanValue.Parse = function(text) {
	var bool = text==="true";
	return BooleanValue.ValueOf(bool);
};

BooleanValue.prototype.getValue = function() {
	return this.value;
};

BooleanValue.prototype.And = function(value) {
	if(value instanceof BooleanValue) {
		return BooleanValue.ValueOf(this.value && value.value);
	} else {
		throw new SyntaxError("Illegal: Boolean and " + typeof(value));
	}
	return this.value;
};

BooleanValue.prototype.Or = function(value) {
	if(value instanceof BooleanValue) {
		return BooleanValue.ValueOf(this.value || value.value);
	} else {
		throw new SyntaxError("Illegal: Boolean or " + typeof(value));
	}
	return this.value;
};

BooleanValue.prototype.Not = function() {
	return this.not;
};

/*
public Boolean getNot() {
	return not;
}

public int CompareTo(Context context, IValue value) throws SyntaxError {
	if (value instanceof Boolean)
		return compareTo((Boolean) value);
	else
		throw new SyntaxError("Illegal comparison: Boolean + " + value.getClass().getSimpleName());
}

public int compareTo(Boolean other) {
	return java.lang.Boolean.compare(this.value, other.value);
}

public Object ConvertTo(Class<?> type) {
	return value;
}
*/

BooleanValue.prototype.toString = function() {
	return this.value.toString();
};

BooleanValue.prototype.equals = function(obj) {
	if (obj instanceof BooleanValue) {
		return this.value == obj.value;
	} else {
		return false;
	}
};

exports.BooleanValue = BooleanValue;