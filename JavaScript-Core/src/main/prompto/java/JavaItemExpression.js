const JavaSelectorExpression = require("./JavaSelectorExpression").JavaSelectorExpression;

class JavaItemExpression extends JavaSelectorExpression {
    constructor(item) {
        super();
        this.item = item || null;
        return this;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }
}

exports.JavaItemExpression = JavaItemExpression;