var Literal = require("./Literal").Literal;
var TextValue = null;
var TextType = require("../type/TextType").TextType;


exports.resolve = () => {
	TextValue = require("../value/TextValue").TextValue;
};

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

class TextLiteral extends Literal {
    constructor(text) {
        super(text, new TextValue(unescape(text)));
        return this;
    }

    check(context) {
        return TextType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}

exports.TextLiteral = TextLiteral;
