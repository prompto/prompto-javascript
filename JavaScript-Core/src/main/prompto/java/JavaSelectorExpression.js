var JavaExpression = require("./JavaExpression").JavaExpression;

class JavaSelectorExpression extends JavaExpression {
    constructor(parent) {
        super();
        this.parent = parent || null;
        return this;
    }
}

exports.JavaSelectorExpression = JavaSelectorExpression;
