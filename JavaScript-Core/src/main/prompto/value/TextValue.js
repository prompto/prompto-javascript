var Value = require("./Value").Value;
var Character = require("./Character").Character;
var Integer = require("./Integer").Integer;
var TextType = require("../type/TextType").TextType;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
var removeAccents = require("../utils/Utils").removeAccents;

function TextValue(value) {
	Value.call(this, TextType.instance);
	this.value = value;
	return this;
}

TextValue.prototype = Object.create(Value.prototype);
TextValue.prototype.constructor = TextValue;

TextValue.prototype.getStorableData = function() {
    return this.value;
};

TextValue.prototype.getValue = function() {
	return this.value;
};

TextValue.prototype.toString = function() {
	return this.value;
};

TextValue.prototype.Add = function(context, value) {
	return new TextValue(this.value + value.toString());
};

TextValue.prototype.Multiply = function(context, value) {
	if (value instanceof Integer) {
		var count = value.IntegerValue();
		if (count < 0) {
			throw new SyntaxError("Negative repeat count:" + count);
		} else if (count == 0) {
			return new TextValue("");
		} else if (count == 1) {
			return new TextValue(this.value);
		} else {
			var all = [];
			while (--count >= 0) {
				all[count] = this.value;
			}
			var value = all.join("");
			return new TextValue(value);
		}
	} else {
		throw new SyntaxError("Illegal: Chararacter * " + typeof(value));
	}
};

TextValue.prototype.CompareTo = function(context, value) {
	if(value instanceof TextValue || value instanceof Character) {
		return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
	} else {
		throw new SyntaxError("Illegal: Compare TextValue with " + typeof(value));
	}
};

TextValue.prototype.hasItem = function(context, value) {
	if (value instanceof Character || value instanceof TextValue) {
		return this.value.indexOf(value.value) >= 0;
	} else {
		throw new SyntaxError("Illegal contains: TextValue + " + typeof(value));
	}
};


TextValue.prototype.getMemberValue = function(context, name) {
	if ("count"==name) {
		return new Integer(this.value.length);
	} else {
        return Value.prototype.getMemberValue.call(this, context, name);
	}
};

TextValue.prototype.getItemInContext = function(context, index) {
	try {
		if (index instanceof Integer) {
			return new Character(this.value[index.IntegerValue() - 1]);
		} else {
			throw new InvalidDataError("No such item:" + index.toString());
		}
	} catch (e) {
		if(e instanceof IndexOutOfBoundsException) {
			throw new IndexOutOfRangeError();
		} else {
			throw e;
		}
	}

}

TextValue.prototype.getIterator = function(context) {
	return new TextIterator(this.value);
};

function TextIterator(value) {
	this.index = -1;
	this.value = value;
	return this;
}

TextIterator.prototype.hasNext = function() {
	return this.index < this.value.length - 1;
};

TextIterator.prototype.next = function() {
	return new Character(this.value[++this.index]);
};


TextValue.prototype.convertToJavaScript = function() {
	return this.value;
};

TextValue.prototype.slice = function(fi, li) {
	var first = this.checkFirst(fi);
	var last = this.checkLast(li);
	return new TextValue(this.value.slice(first - 1, last));
};

TextValue.prototype.checkFirst = function(fi) {
	var value = (fi == null) ? 1 : fi.IntegerValue();
	if (value < 1 || value > this.value.length) {
		throw new IndexOutOfRangeError();
	}
	return value;
};

TextValue.prototype.checkLast = function(li) {
	var value = (li == null) ? this.value.length : li.IntegerValue();
	if (value < 0) {
		value = this.value.length + 1 + li.IntegerValue();
	}
	if (value < 1 || value > this.value.length) {
		throw new IndexOutOfRangeError();
	}
	return value;
};

TextValue.prototype.equals = function(obj) {
	if (obj instanceof TextValue) {
		return this.value == obj.value;
	} else {
		return false;
	}
};

TextValue.prototype.Roughly = function(context, obj) {
    if (obj instanceof TextValue || obj instanceof Character) {
        return removeAccents(this.value.toLowerCase()) == removeAccents(obj.value.toLowerCase());
    } else {
        return false;
    }
};


TextValue.prototype.Contains = function(context, obj) {
    if (obj instanceof TextValue || obj instanceof Character) {
        return this.value.indexOf(obj.value) >= 0;
    } else {
        return false;
    }
};


TextValue.prototype.toJson = function(context, json, instanceId, fieldName, withType, binaries) {
    if(Array.isArray(json))
        json.push(this.value);
    else
        json[fieldName] = this.value;
};

exports.TextValue = TextValue;


