const CSharpExpression = require("./CSharpExpression").CSharpExpression;

class CSharpSelectorExpression extends CSharpExpression {
    constructor(parent) {
        super();
        this.parent = parent || null;
        return this;
    }
}

exports.CSharpSelectorExpression = CSharpSelectorExpression;
