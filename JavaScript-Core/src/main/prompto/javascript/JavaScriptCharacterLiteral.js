
export default class JavaScriptCharacterLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return CharacterType.instance;
    }
}
