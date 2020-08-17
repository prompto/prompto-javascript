
export default class JavaScriptTextLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return TextType.instance;
    }
}
