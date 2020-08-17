
export default class JavaScriptBooleanLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return BooleanType.instance;
    }
}
