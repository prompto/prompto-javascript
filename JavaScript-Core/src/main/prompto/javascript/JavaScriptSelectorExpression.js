var JavaScriptExpression = require("./JavaScriptExpression").JavaScriptExpression;

class JavaScriptSelectorExpression extends JavaScriptExpression {
    constructor(parent) {
        super();
        this.parent = parent || null;
        return this;
    }
}

exports.JavaScriptSelectorExpression = JavaScriptSelectorExpression;
