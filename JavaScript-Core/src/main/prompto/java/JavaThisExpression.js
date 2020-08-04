var JavaExpression = require("./JavaExpression").JavaExpression;

class JavaThisExpression extends JavaExpression {
    constructor() {
        super();
        return this;
    }

    toString() {
        return "this";
    }

    toDialect(writer) {
        writer.append("this");
    }
}

exports.JavaThisExpression = JavaThisExpression;