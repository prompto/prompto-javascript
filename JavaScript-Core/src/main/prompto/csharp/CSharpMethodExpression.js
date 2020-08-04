var CSharpSelectorExpression = require("./CSharpSelectorExpression").CSharpSelectorExpression;
var CSharpExpressionList = require("./CSharpExpressionList").CSharpExpressionList;

class CSharpMethodExpression extends CSharpSelectorExpression {
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args || new CSharpExpressionList();
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

exports.CSharpMethodExpression = CSharpMethodExpression;