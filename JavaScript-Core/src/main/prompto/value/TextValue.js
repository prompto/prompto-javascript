var Value = require("./Value").Value;
var CharacterValue = require("./CharacterValue").CharacterValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
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
    if (value instanceof IntegerValue) {
        try {
            var text = this.value.repeat(value.value);
            return new TextValue(text);
        } catch(error) {
            throw new SyntaxError("Negative repeat count:" + count);
        }
	} else {
		throw new SyntaxError("Illegal: Chararacter * " + typeof(value));
	}
};

TextValue.prototype.compareToValue = function(context, value) {
	if(value instanceof TextValue || value instanceof CharacterValue) {
		return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
	} else {
		throw new SyntaxError("Illegal: Compare TextValue with " + typeof(value));
	}
};

TextValue.prototype.hasItem = function(context, value) {
	if (value instanceof CharacterValue || value instanceof TextValue) {
		return this.value.indexOf(value.value) >= 0;
	} else {
		throw new SyntaxError("Illegal contains: TextValue + " + typeof(value));
	}
};


TextValue.prototype.getMemberValue = function(context, name) {
	if ("count"==name) {
		return new IntegerValue(this.value.length);
	} else {
        return Value.prototype.getMemberValue.call(this, context, name);
	}
};

TextValue.prototype.getItemInContext = function(context, index) {
	try {
		if (index instanceof IntegerValue) {
			return new CharacterValue(this.value[index.IntegerValue() - 1]);
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
	return new CharacterValue(this.value[++this.index]);
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
    if (obj instanceof TextValue || obj instanceof CharacterValue) {
        return removeAccents(this.value.toLowerCase()) == removeAccents(obj.value.toLowerCase());
    } else {
        return false;
    }
};


TextValue.prototype.Contains = function(context, obj) {
    if (obj instanceof TextValue || obj instanceof CharacterValue) {
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


