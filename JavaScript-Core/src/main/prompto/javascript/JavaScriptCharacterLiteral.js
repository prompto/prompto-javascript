const JavaScriptLiteral = require("./JavaScriptLiteral").JavaScriptLiteral;
const CharacterType = require("../type/CharacterType").CharacterType;

class JavaScriptCharacterLiteral extends JavaScriptLiteral {
    constructor(text) {
        super(text);
        return this;
    }

    check(context) {
        return CharacterType.instance;
    }
}

exports.JavaScriptCharacterLiteral = JavaScriptCharacterLiteral;

