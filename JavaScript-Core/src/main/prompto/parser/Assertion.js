var BooleanType = require("../type/BooleanType").BooleanType;
var EqualsExpression = require("../expression/EqualsExpression").EqualsExpression;

class Assertion {
    constructor(expression) {
        this.expression = expression;
        return this;
    }

    check(context) {
        var type = this.expression.check(context);
        if(type!==BooleanType.instance)
            context.problemListener.reportIllegalNonBoolean(this.expression, type);
        if(this.expression instanceof EqualsExpression)
            context = this.expression.downCast(context, false);
        return context;
    }

    interpretAssert(context, test) {
        return this.expression.interpretAssert(context, test);
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        this.expression.transpile(transpiler);
    }

    transpileFound(transpiler, dialect) {
        this.expression.transpileFound(transpiler, dialect);
    }

    toDialect(writer) {
        this.expression.toDialect(writer);
    }

    getExpected(context, dialect, escapeMode) {
        return this.expression.getExpected(context, dialect, escapeMode);
    }
}

exports.Assertion = Assertion;