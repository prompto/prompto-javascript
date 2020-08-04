var Literal = require("./Literal").Literal;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var IntegerType = require("../type/IntegerType").IntegerType;

/* jshint bitwise:false*/
function parseHexa(text) {
	var value = 0;
	for(var i=2;i<text.length; i++) {
		value <<= 4;
		var c = text[i];
		if(c>='0' && c<='9') {
			value += (c.charCodeAt(0) - '0'.charCodeAt(0));
		} else if(c>='a' && c<='f') {
			value += (c.charCodeAt(0) - 'a'.charCodeAt(0));
		} else if(c>='A' && c<='F') {
			value += 10 + (c.charCodeAt(0) - 'A'.charCodeAt(0));
		} else {
			throw (text + " is not a valid hexadecimal number");
		}
	}
	return new IntegerValue(value);
}

class HexaLiteral extends Literal {
    constructor(text) {
        super(text, parseHexa(text));
        return this;
    }

    check(context) {
        return IntegerType.instance;
    }
}

HexaLiteral.parseHexa = parseHexa;

exports.HexaLiteral = HexaLiteral;