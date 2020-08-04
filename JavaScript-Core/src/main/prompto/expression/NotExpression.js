var Expression = require("./Expression").Expression;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var BooleanType = require("../type/BooleanType").BooleanType;

class NotExpression extends Expression {
 
    constructor(expression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "not " + this.expression.toString();
    }

    operatorToDialect(dialect) {
        return dialect==Dialect.O ? "! ": "not ";
    }

    toDialect(writer) {
        writer.toDialect(this);
        this.expression.toDialect(writer);
    }

    toEDialect(writer) {
        writer.append("not ");
    }

    toMDialect(writer) {
        writer.append("not ");
    }

    toODialect(writer) {
        writer.append("!");
    }

    check(context) {
        var type = this.expression.check(context);
        if (type)
            return type.checkNot(context);
        else {
            context.problemListener.reportError(this, "Could not check expression to negate");
            return BooleanType.instance; // don't propagate error
        }
    }

    checkQuery(context) {
        if (!this.expression["checkQuery"]) {
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
            return;
        }
        this.expression.checkQuery(context);
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("!(");
        this.expression.transpile(transpiler);
        transpiler.append(")");
    }

    interpret(context) {
        var val = this.expression.interpret(context);
        return val.Not();
    }

    interpretAssert(context, test) {
        var result = this.interpret(context);
        if(result==BooleanValue.TRUE)
            return true;
        var expected = this.getExpected(context, test.dialect);
        var actual = this.operatorToDialect(test.dialect) + result.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    interpretQuery(context, query) {
        if (!this.expression["interpretQuery"])
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
        this.expression.interpretQuery(context, query);
        query.not();
    }

    declareQuery(transpiler) {
        this.expression.declareQuery(transpiler);
    }

    transpileQuery(transpiler, builderName) {
        this.expression.transpileQuery(transpiler, builderName);
        transpiler.append(builderName).append(".not();").newLine();
    }

    getExpected(context, dialect, escapeMode) {
        var writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler, dialect) {
        this.transpile(transpiler);
    }
}



exports.NotExpression = NotExpression;
