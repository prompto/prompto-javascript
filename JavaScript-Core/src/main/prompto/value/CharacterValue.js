var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextValue = null; // circular dependency
var removeAccents = require("../utils/Utils").removeAccents;

exports.resolve = function() {
    TextValue = require("./TextValue").TextValue;
}

class CharacterValue extends Value {
    constructor(value) {
        super(CharacterType.instance);
        this.value = value;
        return this;
    }

    static isWhitespace(c) {
        return !!whitespace[c.charCodeAt(0)];
    }

    getMemberValue(context, name) {
        if ("codePoint"==name) {
            return new IntegerValue(this.value.charCodeAt(0));
        } else {
            return Value.prototype.getMemberValue.call(this, context, name);
        }
    }

    Add(context, value) {
        return new TextValue(this.value + value.toString());
    }

    Multiply(context, value) {
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
    }

    cmp(obj) {
        return this.value > obj.value ? 1 : this.value == obj.value ? 0 : -1 ;
    }

    compareToValue(context, value) {
        if(value instanceof TextValue || value instanceof CharacterValue) {
            return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
        } else {
            throw new SyntaxError("Illegal: Compare CharacterValue with " + typeof(value));
        }
    }

    convertToJavaScript() {
        return this.value;
    }

    toString() {
        return this.value;
    }

    equals(obj) {
        if (obj instanceof CharacterValue) {
            return this.value == obj.value;
        } else {
            return false;
        }
    }

    Roughly(context, obj) {
        if (obj instanceof TextValue || obj instanceof CharacterValue) {
            return removeAccents(this.value.toLowerCase()) == removeAccents(obj.value.toLowerCase());
        } else {
            return false;
        }
    }
}

var whitespace = [];
whitespace[" ".charCodeAt(0)] = true;
whitespace["\t".charCodeAt(0)] = true;
whitespace["\r".charCodeAt(0)] = true;
whitespace["\n".charCodeAt(0)] = true;

exports.CharacterValue = CharacterValue;


