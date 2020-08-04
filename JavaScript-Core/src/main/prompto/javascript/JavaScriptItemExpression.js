var JavaScriptSelectorExpression = require("./JavaScriptSelectorExpression").JavaScriptSelectorExpression;

class JavaScriptItemExpression extends JavaScriptSelectorExpression {
    constructor(item) {
        super();
        this.item = item || null;
        return this;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }
}

exports.JavaScriptItemExpression = JavaScriptItemExpression;