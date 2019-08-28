var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextValue = null; // circular dependency
var removeAccents = require("../utils/Utils").removeAccents;

exports.resolve = function() {
    TextValue = require("./TextValue").TextValue;
}

function CharacterValue(value) {
    Value.call(this, CharacterType.instance);
	this.value = value;
	return this;
}

CharacterValue.prototype = Object.create(Value.prototype);
CharacterValue.prototype.constructor = CharacterValue;

var whitespace = [];
whitespace[" ".charCodeAt(0)] = true;
whitespace["\t".charCodeAt(0)] = true;
whitespace["\r".charCodeAt(0)] = true;
whitespace["\n".charCodeAt(0)] = true;

CharacterValue.isWhitespace = function(c) {
	return !!whitespace[c.charCodeAt(0)];
};


CharacterValue.prototype.getMemberValue = function(context, name) {
    if ("codePoint"==name) {
        return new IntegerValue(this.value.charCodeAt(0));
    } else {
        return Value.prototype.getMemberValue.call(this, context, name);
    }
};


CharacterValue.prototype.Add = function(context, value) {
    return new TextValue(this.value + value.toString());
}

CharacterValue.prototype.Multiply = function(context, value) {
    if (value instanceof IntegerValue) {
        try {
            var text = this.value.repeat(value.value);
            return new TextValue(text);
        } catch(error) {
            throw new SyntaxError("Negative repeat count:" + value.value);
        }
    } else {
        throw new SyntaxError("Illegal: Chararacter * " + typeof(value));
    }
};

CharacterValue.prototype.cmp = function(obj) {
    return this.value > obj.value ? 1 : this.value == obj.value ? 0 : -1 ;
};

CharacterValue.prototype.compareToValue = function(context, value) {
    if(value instanceof TextValue || value instanceof CharacterValue) {
        return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
    } else {
        throw new SyntaxError("Illegal: Compare CharacterValue with " + typeof(value));
    }
};

CharacterValue.prototype.convertToJavaScript = function() {
    return this.value;
};

CharacterValue.prototype.toString = function() {
    return this.value;
};

CharacterValue.prototype.equals = function(obj) {
    if (obj instanceof CharacterValue) {
        return this.value == obj.value;
    } else {
        return false;
    }
};

CharacterValue.prototype.Roughly = function(context, obj) {
    if (obj instanceof TextValue || obj instanceof CharacterValue) {
        return removeAccents(this.value.toLowerCase()) == removeAccents(obj.value.toLowerCase());
    } else {
        return false;
    }
};

exports.CharacterValue = CharacterValue;


