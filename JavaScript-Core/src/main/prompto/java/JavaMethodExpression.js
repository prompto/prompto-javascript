var JavaSelectorExpression = require("./JavaSelectorExpression").JavaSelectorExpression;
var JavaExpressionList = require("./JavaExpressionList").JavaExpressionList;

class JavaMethodExpression extends JavaSelectorExpression {
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args || new JavaExpressionList();
        return this;
    }

    toString() {
        return this.parent.toString() + "." + this.name + "(" + this.args.toString() + ")";
    }

    toDialect(writer) {
        this.parent.toDialect(writer);
        writer.append('.');
        writer.append(this.name);
        writer.append('(');
        this.args.toDialect(writer);
        writer.append(')');
    }
}

exports.JavaMethodExpression = JavaMethodExpression;