var Literal = require("./Literal").Literal;
var TextValue = require("../value/TextValue").TextValue;
var TextType = require("../type/TextType").TextType;

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

function TextLiteral(text) {
	Literal.call(this, text, new TextValue(unescape(text)));
	return this;
}

TextLiteral.prototype = Object.create(Literal.prototype);
TextLiteral.prototype.constructor = TextLiteral;


TextLiteral.prototype.check = function(context) {
	return TextType.instance;
};

TextLiteral.prototype.transpile = function(transpiler) {
    transpiler.append(this.text);
};

exports.TextLiteral = TextLiteral;
