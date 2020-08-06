const CSharpExpression = require("./CSharpExpression").CSharpExpression;

class CSharpThisExpression extends CSharpExpression {
    constructor() {
        super();
        return this;
    }

    toDialect(writer) {
        return writer.append("this");
    }

    toString() {
        return "this";
    }
}

exports.CSharpThisExpression = CSharpThisExpression;