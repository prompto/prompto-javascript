var Expression = require("./Expression").Expression;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

class AndExpression extends Expression {
  
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " and " + this.right.toString();
    }

    operatorToDialect(dialect) {
        return dialect==Dialect.O ? " && " : " and ";
    }

    toEDialect(writer) {
        this.left.toDialect(writer);
        writer.append(" and ");
        this.right.toDialect(writer);
    }

    toODialect(writer) {
        this.left.toDialect(writer);
        writer.append(" && ");
        this.right.toDialect(writer);
    }

    toMDialect(writer) {
        this.left.toDialect(writer);
        writer.append(" and ");
        this.right.toDialect(writer);
    }

    check(context) {
        var lt = this.left.check(context);
        var rt = this.right.check(context);
        return lt.checkAnd(context, rt);
    }

    checkQuery(context) {
        if (!this.left["checkQuery"]) {
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
            return;
        }
        this.left.checkQuery(context);
        if (!this.right["checkQuery"]) {
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
            return;
        }
        this.right.checkQuery(context);
    }

    interpret(context) {
        var lval = this.left.interpret(context);
        if(lval instanceof BooleanValue && !lval.value)
            return lval;
        var rval = this.right.interpret(context);
        return lval.And(rval);
    }

    declare(transpiler) {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
    }

    transpile(transpiler) {
        this.left.transpile(transpiler);
        transpiler.append(" && ");
        this.right.transpile(transpiler);
    }

    interpretAssert(context, test) {
        var lval = this.left.interpret(context);
        var rval = lval;
        if(lval instanceof BooleanValue && lval.value)
            rval = this.right.interpret(context);
        if(rval==BooleanValue.TRUE)
            return true;
        var expected = this.getExpected(context, test.dialect);
        var actual = lval.toString() + this.operatorToDialect(test.dialect) + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    getExpected(context, dialect, escapeMode) {
        var writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler, dialect) {
        transpiler.append("(");
        this.left.transpile(transpiler);
        transpiler.append(") + '").append(this.operatorToDialect(dialect)).append("' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    interpretQuery(context, query) {
        if (!this.left["interpretQuery"])
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        this.left.interpretQuery(context, query);
        if (!this.right["interpretQuery"])
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
        this.right.interpretQuery(context, query);
        query.and();
    }

    declareQuery(transpiler) {
        this.left.declareQuery(transpiler);
        this.right.declareQuery(transpiler);
    }

    transpileQuery(transpiler, builderName) {
        this.left.transpileQuery(transpiler, builderName);
        this.right.transpileQuery(transpiler, builderName);
        transpiler.append(builderName).append(".and();").newLine();
    }
}

exports.AndExpression = AndExpression;

