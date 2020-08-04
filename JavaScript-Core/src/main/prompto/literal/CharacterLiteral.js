var Literal = require("./Literal").Literal;
var CharacterValue = require("../value/CharacterValue").CharacterValue;
var CharacterType = require("../type/CharacterType").CharacterType;

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

class CharacterLiteral extends Literal {
    constructor(text) {
        super(text, new CharacterValue(unescape(text)));
        return this;
    }

    check(context) {
        return CharacterType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}


exports.CharacterLiteral = CharacterLiteral;
