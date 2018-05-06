var Literal = require("./Literal").Literal;
var CharacterValue = require("../value/CharacterValue").CharacterValue;
var CharacterType = require("../type/CharacterType").CharacterType;

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

function CharacterLiteral(text) {
	Literal.call(this, text, new CharacterValue(unescape(text)));
	return this;
}

CharacterLiteral.prototype = Object.create(Literal.prototype);
CharacterLiteral.prototype.constructor = CharacterLiteral;


CharacterLiteral.prototype.check = function(context) {
	return CharacterType.instance;
};


CharacterLiteral.prototype.transpile = function(transpiler) {
    transpiler.append(this.text);
};


exports.CharacterLiteral = CharacterLiteral;
