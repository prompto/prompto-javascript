
export default class NotExpression extends Expression {
 
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
        const type = this.expression.check(context);
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
        const val = this.expression.interpret(context);
        return val.Not();
    }

    interpretAssert(context, test) {
        const result = this.interpret(context);
        if(result==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect);
        const actual = this.operatorToDialect(test.dialect) + result.toString();
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
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler, dialect) {
        this.transpile(transpiler);
    }
}

