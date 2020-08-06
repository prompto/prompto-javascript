const Expression = require("./Expression").Expression;

class ParenthesisExpression extends Expression {
  
    constructor(expression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "(" + this.expression.toString() + ")";
    }

    toDialect(writer) {
        writer.append("(");
        this.expression.toDialect(writer);
        writer.append(")");
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(");
        this.expression.transpile(transpiler);
        transpiler.append(")");
    }

    check(context) {
        return this.expression.check(context);
    }

    interpret(context) {
        return this.expression.interpret(context);
    }

    checkQuery(context) {
        if (!this.expression["checkQuery"]) {
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
            return;
        }
        this.expression.checkQuery(context);
    }

    interpretQuery(context, query) {
        if (!this.expression["interpretQuery"])
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
        this.expression.interpretQuery(context, query);
        query.not();
    }

    transpileQuery(transpiler, builderName) {
        this.expression.transpileQuery(transpiler, builderName);
    }
}

exports.ParenthesisExpression = ParenthesisExpression;
