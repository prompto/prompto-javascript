import JavaScriptExpression from './JavaScriptExpression.js'

export default class JavaScriptSelectorExpression extends JavaScriptExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }
}

