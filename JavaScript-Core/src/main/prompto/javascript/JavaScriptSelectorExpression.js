import JavaScriptExpression from "./JavaScriptExpression"

export default class JavaScriptSelectorExpression extends JavaScriptExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }
}

